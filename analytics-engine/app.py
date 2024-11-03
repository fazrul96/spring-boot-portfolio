import shutil

from flask import Flask, request, send_file, jsonify, send_from_directory
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
import os
import zipfile

app = Flask(__name__, static_folder='static')
CORS(app)

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

def cleanup_directory(directory):
    """Remove the specified directory and all its contents."""
    if os.path.exists(directory):
        shutil.rmtree(directory)

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

        # Extract images
        # extract_images_from_zip(zip_path)

        # Delete extracted images after zipping
        root_dir = f"public"
        dir_name = f"{title}-chapter-{chapter}"
        unique_dir = os.path.join(root_dir, DOWNLOAD_DIR, dir_name)
        cleanup_directory(unique_dir)

        return jsonify({"message": "Download completed", "zip_path": zip_path}), 200

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)

# ---- Image Serving and Listing Endpoints ----
@app.route('/images/<path:filename>', methods=['GET'])
def serve_image(filename):
    """Serve an image from the extracted images directory."""
    try:
        return send_from_directory(EXTRACTED_IMAGES_DIRECTORY, filename)
    except FileNotFoundError:
        return create_error_response(ERROR_MESSAGES["file_not_found"], 404)

@app.route('/api/list-images', methods=['GET'])
def list_images():
    """List all extracted images in the directory."""
    try:
        images = os.listdir(EXTRACTED_IMAGES_DIRECTORY)
        return jsonify(images), 200
    except Exception as e:
        return create_error_response(str(e), 500)

# ---- Main Application Entry Point ----
if __name__ == "__main__":
    app.run(port=5001)