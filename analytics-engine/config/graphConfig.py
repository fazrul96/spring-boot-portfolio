# Plot Settings
PLOT_SETTINGS = {
    "figure_size": (12, 6),  # Width, height of the plot figure
    "systolic_color": 'blue',  # Color for systolic blood pressure line
    "diastolic_color": 'green',  # Color for diastolic blood pressure line
    "target_systolic_color": 'red',  # Color for systolic target line
    "target_diastolic_color": 'yellow',  # Color for diastolic target line
    "target_line_style": '--',  # Style for target lines (dashed)
    "target_line_width": 2.5,  # Width of the target lines
    "y_limits": (50, 200),  # Y-axis limits for the blood pressure plot
    "grid_style": '--',  # Grid line style
    "grid_alpha": 0.5,  # Transparency for grid lines
    "save_plot_filename": 'blood_pressure_readings.png'  # Filename for saving the plot
}

# CSV Column Names
COLUMN_NAMES = {
    "time_column": 'time',  # Column for time data
    "systolic_column": 'systolic',  # Column for systolic blood pressure values
    "diastolic_column": 'diastolic',  # Column for diastolic blood pressure values
    "systolic_target_column": 'systolic_target',  # Column for systolic target values
    "diastolic_target_column": 'diastolic_target'  # Column for diastolic target values
}

# Error Message Templates
ERROR_MESSAGES = {
    "csv_processing_error": "Error processing CSV file: {}"  # Message template for CSV errors
}

# Validation function (optional)
def validate_plot_settings():
    """Validates plot settings for correct matplotlib compatibility."""
    import matplotlib.colors as mcolors

    # Check colors
    colors = [PLOT_SETTINGS['systolic_color'], PLOT_SETTINGS['diastolic_color'],
              PLOT_SETTINGS['target_systolic_color'], PLOT_SETTINGS['target_diastolic_color']]
    for color in colors:
        if color not in mcolors.CSS4_COLORS:
            raise ValueError(f"Invalid color specified: {color}")

    # Check line style
    if PLOT_SETTINGS["target_line_style"] not in ['-', '--', '-.', ':']:
        raise ValueError(f"Invalid line style specified: {PLOT_SETTINGS['target_line_style']}")