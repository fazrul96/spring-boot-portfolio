from flask import Flask, request, send_file
from utils.file_handler import extract_blood_pressure_data
from utils.graph_generator import generate_blood_pressure_plot

app = Flask(__name__)

@app.route('/generate-graph', methods=['POST'])
def generate_graph():
    # Validate file presence in the request
    if 'file' not in request.files:
        return "No file part in the request", 400

    file = request.files['file']
    if file.filename == '':
        return "No file selected", 400

    try:
        # Extract data from the file
        time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target = extract_blood_pressure_data(file)

        # Generate the plot image
        plot_image = generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target)

        # Return the image file as response
        return send_file(plot_image, mimetype='image/png')

    except ValueError as e:
        return str(e), 500
    except Exception as e:
        return "An unexpected error occurred", 500

if __name__ == "__main__":
    app.run(port=5001)