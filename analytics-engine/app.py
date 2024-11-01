from flask import Flask, request, send_file, jsonify, send_from_directory
from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot
from utils.pattern_handler import get_pattern_handler
from utils.url_builder import build_url
from config.settings import EXTRACTED_IMAGES_DIRECTORY, ERROR_MESSAGES, GENERATE_GRAPH_ROUTE, DOWNLOAD_WEBTOON_ROUTE
import os
import zipfile

app = Flask(__name__, static_folder='static')


# ---- Blood Pressure Graph Generation Endpoint ----
@app.route(GENERATE_GRAPH_ROUTE, methods=['POST'])
def generate_graph():
    file = request.files.get('file')

    if not file or file.filename == '':
        return create_error_response(ERROR_MESSAGES["no_file"], 400)

    try:
        # Extract data from the file
        time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target = extract_blood_pressure_data(file)

        # Generate and return plot image
        plot_image = generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target)
        return send_file(plot_image, mimetype='image/png')

    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)

# ---- Webtoon Download API Endpoint ----
@app.route(DOWNLOAD_WEBTOON_ROUTE, methods=['POST'])
def download_webtoon():
    title = request.form.get("title")
    chapter = request.form.get("chapter")
    source = request.form.get("source", "hivetoon")  # Default value

    # Validate required fields
    if not all([title, chapter, source]):
        return create_error_response(ERROR_MESSAGES["missing_fields"], 400)

    try:
        # Generate the URL dynamically
        url = build_url(source, title, chapter)
        handler = get_pattern_handler(source)
        zip_path = handler.download_images(title, chapter, url)

        return jsonify({"message": "Download completed", "zip_path": zip_path}), 200
    except ValueError as e:
        return create_error_response(str(e), 400)
    except Exception:
        return create_error_response(ERROR_MESSAGES["unexpected_error"], 500)


def create_error_response(message, status_code):
    """Helper function to create error responses."""
    return jsonify({"error": message}), status_code


def extract_images(zip_path):
    """Extract images from the zip file to the specified directory."""
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(EXTRACTED_IMAGES_DIRECTORY)


@app.route('/images/<path:filename>', methods=['GET'])
def serve_image(filename):
    """Serve images from the extracted images directory."""
    return send_from_directory(EXTRACTED_IMAGES_DIRECTORY, filename)


@app.route('/api/list-images', methods=['GET'])
def list_images():
    """List all extracted images."""
    try:
        images = os.listdir(EXTRACTED_IMAGES_DIRECTORY)
        return jsonify(images), 200
    except Exception as e:
        return create_error_response(str(e), 500)


if __name__ == "__main__":
    app.run(port=5001)