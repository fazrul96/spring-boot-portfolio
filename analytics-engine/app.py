from flask import Flask, request, send_file, jsonify
from config.settings import SUPPORTED_URLS
from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot
from utils.pattern_handler import get_pattern_handler
from utils.url_builder import build_url

app = Flask(__name__, static_folder='static')

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

        return jsonify({"message": "Download completed", "zip_path": zip_path}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == "__main__":
    app.run(port=5001)