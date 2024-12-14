import logging
import shutil
import os
import zipfile
import time
import psutil
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot
from handlers.PatternHandler import PatternHandlerFactory
from utils.url_builder import URLBuilder
from config.WebtoonConfig import (
    WebtoonSource,
    WebtoonConfig
)
from constants.GeneralConstant import (
    ERROR_MESSAGES,
    EXTRACTED_IMAGES_DIRECTORY,
    DOWNLOAD_DIR, ROOT_DIR,
)
from routes.ApiRoute import (
    ApiRoutes
)
from data.form.WebtoonForm import webtoon_form_data, latest_chapter_webtoon_form_data
from dotenv import load_dotenv
from service.WebDriverManagerService import WebDriverManager
load_dotenv()


def create_app():
    app = Flask(__name__, static_folder='static')
    # app.config.from_object(Config)
    CORS(app)

    return app


app = create_app()


# ---- Helper Functions ----
def create_error_response(message, status_code):
    """Helper function to create a consistent error response."""
    return jsonify({"error": message}), status_code


def validate_file_upload(file):
    """Validate file input for blood pressure data extraction."""
    if not file or file.filename == '':
        return create_error_response(ERROR_MESSAGES["no_file"], 400)
    return None


def validate_webtoon_data(form_data):
    """Validate form data for webtoon download request."""
    required_fields = ["title", "chapter", "source", "suffix"]
    for field in required_fields:
        if not form_data.get(field):
            return create_error_response(ERROR_MESSAGES["missing_fields"], 400)
    return None


def validate_latest_chapter_webtoon_data(form_data):
    """Validate form data for webtoon download request."""
    required_fields = ["title","suffix"]
    for field in required_fields:
        if not form_data.get(field):
            return create_error_response(ERROR_MESSAGES["missing_fields"], 400)
    return None


def extract_images_from_zip(zip_path):
    """Extract images from the provided zip file into the configured directory."""
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(EXTRACTED_IMAGES_DIRECTORY)


def is_file_in_use(file_path):
    """Checks if the file is in use by another process."""
    try:
        for proc in psutil.process_iter(['pid', 'name', 'open_files']):
            for item in proc.info['open_files'] or []:
                if item.path == file_path:
                    return True
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass
    return False


def retry_on_busy(file_path, max_retries=1, delay=2):
    """Retries file operation when the file is in use."""
    retries = 0
    while retries < max_retries:
        if is_file_in_use(file_path):
            logging.error(f"Cannot remove file. File is still in use: {file_path}")
            time.sleep(delay)  # Wait before retrying
            retries += 1
        else:
            return True
    logging.error(f"Max retries reached. File is still in use: {file_path}")
    return False


def cleanup_directory(directory):
    """Removes the directory if it's not in use."""
    if not os.path.exists(directory):
        logging.warning(f"Directory does not exist: {directory}")
        return

    if is_file_in_use(directory):
        logging.error(f"Cannot remove directory. File is still in use: {directory}")
        return

    try:
        os.chmod(directory, 0o777)
        shutil.rmtree(directory)
        logging.info(f"Directory successfully removed: {directory}")
    except PermissionError:
        logging.error(f"Permission denied when trying to remove: {directory}")
    except Exception as e:
        logging.error(f"Unexpected error while removing {directory}: {e}")


def cleanup_zip_file(file_path, max_retries=1, delay=2):
    """Removes the zip file if it's not in use, with retry logic."""
    if not os.path.exists(file_path):
        logging.warning(f"Zip file does not exist: {file_path}")
        return

    # Ensure file has .zip extension
    if not file_path.endswith('.zip'):
        file_path += '.zip'

    if retry_on_busy(file_path, max_retries, delay):
        try:
            os.remove(file_path)
            logging.info(f"Zip file successfully removed: {file_path}")
        except PermissionError:
            logging.error(f"Permission denied when trying to remove: {file_path}")
        except Exception as e:
            logging.error(f"Unexpected error while removing {file_path}: {e}")


# ---- Blood Pressure Graph Generation Endpoint ----
@app.route(ApiRoutes.GENERATE_GRAPH, methods=['POST'])
def generate_graph():
    file = request.files.get('file')

    # Validate file input
    error_response = validate_file_upload(file)
    if error_response:
        return error_response

    try:
        # Extract data and generate plot
        time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target = extract_blood_pressure_data(file)
        plot_image = generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target,
                                                  diastolic_target)
        return send_file(plot_image, mimetype='image/png')

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)


def download_and_zip_images(title, chapter, source, suffix):
    """Download images and create a zip file."""
    url_builder = URLBuilder()

    if source.upper() == WebtoonSource.MANGATOWN.name:
        chapter = f"{str(chapter).zfill(3)}"
        suffix = None

    url = url_builder.build_url(WebtoonSource[source.upper()], title, chapter, suffix)
    logging.info(f"url: {url}")

    handler = PatternHandlerFactory.get_pattern_handler(WebtoonSource[source.upper()])
    zip_path = handler.download_images(title, chapter, url)
    logging.info(f"Images successfully zipped into: {zip_path}")
    return zip_path


def send_zip_file(zip_path):
    """Send the zip file as a response."""
    response = send_file(zip_path, as_attachment=True, mimetype="application/zip")
    if response.status_code == 200:
        logging.info(f"ZIP file successfully sent: {zip_path}")
    else:
        logging.error(f"Failed to send ZIP file: {zip_path}. Status code: {response.status_code}")
    return response


def cleanup_after_send(unique_dir, zip_path, response):
    """Cleanup directories and zip file after sending."""
    if response.status_code == 200:
        cleanup_directory(unique_dir)
        cleanup_zip_file(zip_path)
    else:
        logging.error(f"Failed to clean up: {zip_path}")


def get_latest_chapter(driver, title, suffix):
    """Uses Selenium to navigate to the site and retrieve the latest chapter."""
    url = WebtoonConfig.BASE_URLS.get(WebtoonSource.ASURA)
    if url:
        generated_url = f"{url}{title}{suffix}"
    xpath = "//a[contains(@href, 'chapter')]"
    driver.get(generated_url)

    try:
        # Wait for the element containing the latest chapter to load
        WebDriverWait(driver, 20).until(
            expected_conditions.presence_of_element_located((By.XPATH, xpath))
        )
        chapter_elements = driver.find_elements(By.XPATH, xpath)
        logging.info(f"Found {len(chapter_elements)} chapter elements.")

        chapters = []
        for chapter_element in chapter_elements:
            # Extract the chapter number from the href attribute
            href = chapter_element.get_attribute("href")
            chapter_number = int(href.split('/')[-1])  # Extract chapter number from URL
            chapters.append((chapter_number, href))  # Save the chapter URL

        # Sort by chapter number (descending) and get the latest chapter
        latest_chapter = max(chapters, key=lambda x: x[0])

        logging.info(f"Latest chapter found: {latest_chapter}")
        return latest_chapter[0]
    except Exception as e:
        logging.error(f"Error retrieving the latest chapter: {e}")
        return None
    finally:
        driver.quit()


# ---- Webtoon Download API Endpoint ----
@app.route(ApiRoutes.DOWNLOAD_WEBTOON, methods=['POST'])
def download_webtoon():
    # Validate form data
    error_response = validate_webtoon_data(request.form)
    if error_response:
        return error_response

    try:
        # Extract form data
        title, chapter, source, suffix = webtoon_form_data(request.form)

        # Define directories
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(ROOT_DIR, DOWNLOAD_DIR, dir_name)

        # Cleanup directory before starting the download process
        # cleanup_directory(os.path.join(root_dir, DOWNLOAD_DIR))
        # logging.info(f"Cleanup completed for directory: {os.path.join(root_dir, DOWNLOAD_DIR)}")

        # Build URL, download images, and zip the file
        zip_path = download_and_zip_images(title, chapter, source, suffix)

        # Send the zip file as response
        response = send_zip_file(zip_path)

        # Cleanup after sending the response
        # cleanup_after_send(unique_dir, zip_path, response)
        cleanup_directory(unique_dir)

        return response

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)


@app.route(ApiRoutes.LATEST_CHAPTER_WEBTOON, methods=['POST'])
def fetch_latest_chapter():
    """API endpoint to fetch the latest chapter."""

    error_response = validate_latest_chapter_webtoon_data(request.form)
    if error_response:
        return error_response

    title, suffix = latest_chapter_webtoon_form_data(request.form)

    with WebDriverManager.setup_driver() as driver:
        latest_chapter = get_latest_chapter(driver, title, suffix)
    if latest_chapter:
        return jsonify({"title": title, "latest_chapter": latest_chapter}), 200
    else:
        return jsonify({"error": "Failed to fetch latest chapter"}), 500


# ---- Main Application Entry Point ----
if __name__ == "__main__":
    app.run(port=5001)
