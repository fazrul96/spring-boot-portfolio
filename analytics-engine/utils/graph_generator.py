import numpy as np
import matplotlib.pyplot as plt
from config.graphConfig import PLOT_FIGURE_SIZE, SYSTOLIC_COLOR, DIASTOLIC_COLOR, TARGET_SYSTOLIC_COLOR, \
    TARGET_DIASTOLIC_COLOR, TARGET_LINE_STYLE, TARGET_LINE_WIDTH, SAVE_PLOT_FILENAME, Y_LIMITS, GRID_STYLE, GRID_ALPHA


def generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target):
    # Convert time_data to numeric indices for plotting
    time_numeric = np.arange(len(time_data))

    # Create the figure and axis
    plt.figure(figsize=PLOT_FIGURE_SIZE)

    # Plot Systolic BP
    plt.plot(time_numeric, systolic_bp, color=SYSTOLIC_COLOR, marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Systolic Blood Pressure (SBP)')

    # Plot Diastolic BP
    plt.plot(time_numeric, diastolic_bp, color=DIASTOLIC_COLOR, marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Diastolic Blood Pressure (DBP)')

    # Add target lines for SBP and DBP
    plt.axhline(y=systolic_target, color=TARGET_SYSTOLIC_COLOR, linestyle=TARGET_LINE_STYLE, linewidth=TARGET_LINE_WIDTH,
                label=f'Systolic Target ({systolic_target} mmHg)')
    plt.axhline(y=diastolic_target, color=TARGET_DIASTOLIC_COLOR, linestyle=TARGET_LINE_STYLE, linewidth=TARGET_LINE_WIDTH,
                label=f'Diastolic Target ({diastolic_target} mmHg)')

    # Customize the graph with title, labels, and legend
    plt.title('Blood Pressure Readings Over Time', fontsize=16)
    plt.xlabel('Time', fontsize=12)
    plt.ylabel('Blood Pressure (mmHg)', fontsize=12)

    # Add grid and improve appearance
    plt.grid(True, linestyle=GRID_STYLE, alpha=GRID_ALPHA)
    plt.xticks(time_numeric, time_data, rotation=45, fontsize=10)
    plt.ylim(Y_LIMITS)
    plt.yticks(fontsize=10)

    # Add a legend
    plt.legend(loc='best', fontsize=10)

    # Save and show plot
    plt.tight_layout()
    plt.savefig(SAVE_PLOT_FILENAME)
    plt.show()
