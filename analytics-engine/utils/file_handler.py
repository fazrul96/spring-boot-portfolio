import pandas as pd
from config.graphConfig import TIME_COLUMN, SYSTOLIC_COLUMN, DIASTOLIC_COLUMN, SYSTOLIC_TARGET_COLUMN, \
    DIASTOLIC_TARGET_COLUMN, ERROR_PROCESSING_CSV


def extract_blood_pressure_data(file):
    """Extracts blood pressure data from the uploaded CSV file."""
    try:
        # Read the CSV file
        data = pd.read_csv(file)

        # Extract required columns
        time_data = data[TIME_COLUMN].tolist()
        systolic_bp = data[SYSTOLIC_COLUMN].tolist()
        diastolic_bp = data[DIASTOLIC_COLUMN].tolist()
        systolic_target = data[SYSTOLIC_TARGET_COLUMN].iloc[0]
        diastolic_target = data[DIASTOLIC_TARGET_COLUMN].iloc[0]

        return time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target
    except Exception as e:
        raise ValueError(ERROR_PROCESSING_CSV.format(e))
