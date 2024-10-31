from flask import Flask, request, send_file, jsonify, send_from_directory
from config.settings import SUPPORTED_URLS
from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot
from utils.pattern_handler import get_pattern_handler
from utils.url_builder import build_url
import os
import zipfile

app = Flask(__name__, static_folder='static')

DOWNLOAD_DIRECTORY = "downloads"
EXTRACTED_IMAGES_DIRECTORY = "extracted_images"

# ---- Blood Pressure Graph Generation Endpoint ----
@app.route('/generate-graph', methods=['POST'])
def generate_graph():
    file = request.files.get('file')

    if not file or file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Extract data from the file
        time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target = extract_blood_pressure_data(file)

        # Generate and return plot image
        plot_image = generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target)
        return send_file(plot_image, mimetype='image/png')

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

# ---- Webtoon Download API Endpoint ----
@app.route('/download-webtoon', methods=['POST'])
def download_webtoon():
    title = request.form.get("title")
    chapter = request.form.get("chapter")
    source = request.form.get("source", "hivetoon")  # Default value

    # Validation for required fields
    if not title or not chapter or not source:
        return jsonify({"error": "Title, chapter, and source are required"}), 400

    try:
        # Generate the URL dynamically
        url = build_url(source, title, chapter)

        handler = get_pattern_handler(source)
        zip_path = handler.download_images(title, chapter, url)

        # extract_images(zip_path)

        return jsonify({"message": "Download completed", "zip_path": zip_path}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

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
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)