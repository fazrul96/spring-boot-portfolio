import pandas as pd
from config.graphConfig import COLUMN_NAMES, ERROR_MESSAGES

def extract_blood_pressure_data(file):
    """
    Extracts blood pressure data from the uploaded CSV file.

    Parameters:
        file (str or file-like): Path to the CSV file or a file-like object.

    Returns:
        tuple: A tuple containing:
            - time_data (list): List of time values from the time column.
            - systolic_bp (list): List of systolic blood pressure values.
            - diastolic_bp (list): List of diastolic blood pressure values.
            - systolic_target (float): Target systolic blood pressure from the first row of systolic target column.
            - diastolic_target (float): Target diastolic blood pressure from the first row of diastolic target column.

    Raises:
        ValueError: If there's an error processing the CSV file or if required columns are missing.
    """
    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Ensure required columns are present
        required_columns = [
            COLUMN_NAMES["time_column"],
            COLUMN_NAMES["systolic_column"],
            COLUMN_NAMES["diastolic_column"],
            COLUMN_NAMES["systolic_target_column"],
            COLUMN_NAMES["diastolic_target_column"]
        ]
        for col in required_columns:
            if col not in data.columns:
                raise ValueError(f"Missing required column: {col}")

        # Extract required columns and validate non-empty content
        time_data = data[COLUMN_NAMES["time_column"]].dropna().tolist()
        systolic_bp = data[COLUMN_NAMES["systolic_column"]].dropna().tolist()
        diastolic_bp = data[COLUMN_NAMES["diastolic_column"]].dropna().tolist()

        if not time_data or not systolic_bp or not diastolic_bp:
            raise ValueError("One or more columns contain no data.")

        # Extract target values from the first row
        systolic_target = data[COLUMN_NAMES["systolic_target_column"]].dropna().iloc[0]
        diastolic_target = data[COLUMN_NAMES["diastolic_target_column"]].dropna().iloc[0]

        return time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target

    except Exception as e:
        error_message = ERROR_MESSAGES["csv_processing_error"].format(e)
        raise ValueError(error_message)