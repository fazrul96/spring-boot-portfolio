import pandas as pd

def extract_blood_pressure_data(file):
    """Extracts blood pressure data from the uploaded CSV file."""
    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Extract required columns
        time_data = data['time'].tolist()
        systolic_bp = data['systolic'].tolist()
        diastolic_bp = data['diastolic'].tolist()
        systolic_target = data['systolic_target'].iloc[0]
        diastolic_target = data['diastolic_target'].iloc[0]

        return time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target
    except Exception as e:
        raise ValueError(f"Error processing CSV file: {e}")
