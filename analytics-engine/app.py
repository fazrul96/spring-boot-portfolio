import logging
import shutil
import os
import zipfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot
from utils.pattern_handler import PatternHandlerFactory
from utils.url_builder import URLBuilder
from config.settings import (
    ERROR_MESSAGES,
    EXTRACTED_IMAGES_DIRECTORY,
    DOWNLOAD_DIR,
    ApiRoutes,
    WebtoonSource
)
from dotenv import load_dotenv

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

def extract_images_from_zip(zip_path):
    """Extract images from the provided zip file into the configured directory."""
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(EXTRACTED_IMAGES_DIRECTORY)

def cleanup_directory_quick(directory):
    """
    Quickly removes the specified directory and all its contents using shutil.rmtree.

    Args:
        directory (str): Path to the directory to remove.
    """
    if os.path.exists(directory):
        shutil.rmtree(directory)
    logging.info("Directory successfully been remove")

def cleanup_directory_detailed(directory_path):
    """
    Recursively deletes the specified directory and its contents, handling each file and directory individually.

    Args:
        directory_path (str): Path to the directory to remove.
    """
    if os.path.exists(directory_path):
        for root, dirs, files in os.walk(directory_path, topdown=False):
            for file in files:
                os.remove(os.path.join(root, file))
            for dir in dirs:
                os.rmdir(os.path.join(root, dir))
        os.rmdir(directory_path)
    logging.info("Directory successfully been remove")

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
        plot_image = generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target)
        return send_file(plot_image, mimetype='image/png')

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)

# ---- Webtoon Download API Endpoint ----
@app.route(ApiRoutes.DOWNLOAD_WEBTOON, methods=['POST'])
def download_webtoon():
    # Validate form data
    error_response = validate_webtoon_data(request.form)
    if error_response:
        return error_response

    try:
        # Extract form data
        title = request.form.get("title")
        chapter = request.form.get("chapter")
        source = request.form.get("source")
        suffix = request.form.get("suffix")

        # Build URL and download images
        url_builder = URLBuilder()
        url = url_builder.build_url(WebtoonSource[source.upper()], title, chapter, suffix)
        handler = PatternHandlerFactory.get_pattern_handler(WebtoonSource[source.upper()])
        zip_path = handler.download_images(title, chapter, url)
        logging.info(f"Images successfully been zipped into: {zip_path}")

        # Define the directory to clean up after sending the ZIP file
        root_dir = "public"
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(root_dir, DOWNLOAD_DIR, dir_name)

        # Send the ZIP file to the client and clean up afterward
        response = send_file(zip_path, as_attachment=True, mimetype="application/zip")
        response.call_on_close(lambda: cleanup_directory_quick(unique_dir))
        return response

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)

# ---- Main Application Entry Point ----
if __name__ == "__main__":
    app.run(port=5001)