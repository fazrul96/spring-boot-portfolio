import numpy as np
import matplotlib.pyplot as plt
from config.graphConfig import PLOT_SETTINGS

def generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target,
                                 filename=None, show_plot=True):
    """
    Generates and saves a plot of blood pressure readings over time, with target lines for systolic and diastolic levels.

    Parameters:
        time_data (list): Timestamps or labels for the x-axis.
        systolic_bp (list): Systolic blood pressure readings.
        diastolic_bp (list): Diastolic blood pressure readings.
        systolic_target (float): Target systolic blood pressure.
        diastolic_target (float): Target diastolic blood pressure.
        filename (str): Path to save the plot image.
        show_plot (bool): Whether to display the plot after saving.
    """
    if len(time_data) != len(systolic_bp) or len(time_data) != len(diastolic_bp):
        raise ValueError("Length of time_data, systolic_bp, and diastolic_bp must match.")

    time_numeric = np.arange(len(time_data))

    plt.figure(figsize=PLOT_SETTINGS["figure_size"])

    # Plot Systolic BP
    plt.plot(time_numeric, systolic_bp, color=PLOT_SETTINGS["systolic_color"], marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Systolic Blood Pressure (SBP)')

    # Plot Diastolic BP
    plt.plot(time_numeric, diastolic_bp, color=PLOT_SETTINGS["diastolic_color"], marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Diastolic Blood Pressure (DBP)')

    # Add target lines
    plt.axhline(y=systolic_target, color=PLOT_SETTINGS["target_systolic_color"], linestyle=PLOT_SETTINGS["target_line_style"],
                linewidth=PLOT_SETTINGS["target_line_width"], label=f'Systolic Target ({systolic_target} mmHg)')
    plt.axhline(y=diastolic_target, color=PLOT_SETTINGS["target_diastolic_color"], linestyle=PLOT_SETTINGS["target_line_style"],
                linewidth=PLOT_SETTINGS["target_line_width"], label=f'Diastolic Target ({diastolic_target} mmHg)')

    # Add title, labels, and grid
    plt.title('Blood Pressure Readings Over Time', fontsize=16)
    plt.xlabel('Time', fontsize=12)
    plt.ylabel('Blood Pressure (mmHg)', fontsize=12)
    plt.grid(True, linestyle=PLOT_SETTINGS["grid_style"], alpha=PLOT_SETTINGS["grid_alpha"])
    plt.xticks(time_numeric, time_data, rotation=45, fontsize=10)
    plt.ylim(PLOT_SETTINGS["y_limits"])
    plt.yticks(fontsize=10)

    # Add a legend
    plt.legend(loc='best', fontsize=10)

    # Save and optionally show plot
    plt.tight_layout()
    plot_filename = filename or PLOT_SETTINGS["save_plot_filename"]
    plt.savefig(plot_filename)
    if show_plot:
        plt.show()