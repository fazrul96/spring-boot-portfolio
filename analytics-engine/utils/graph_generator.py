import numpy as np
import matplotlib.pyplot as plt


def generate_blood_pressure_plot(time_data, systolic_bp, diastolic_bp, systolic_target, diastolic_target):
    # Convert time_data to numeric indices for plotting
    time_numeric = np.arange(len(time_data))

    # Create the figure and axis
    plt.figure(figsize=(12, 6))

    # Plot Systolic BP
    plt.plot(time_numeric, systolic_bp, color='blue', marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Systolic Blood Pressure (SBP)')

    # Plot Diastolic BP
    plt.plot(time_numeric, diastolic_bp, color='green', marker='o', linestyle='-', linewidth=2, markersize=8,
             label='Diastolic Blood Pressure (DBP)')

    # Add target lines for SBP and DBP
    plt.axhline(y=systolic_target, color='red', linestyle='--', linewidth=2.5,
                label=f'Systolic Target ({systolic_target} mmHg)')
    plt.axhline(y=diastolic_target, color='yellow', linestyle='--', linewidth=2.5,
                label=f'Diastolic Target ({diastolic_target} mmHg)')

    # Customize the graph with title, labels, and legend
    plt.title('Blood Pressure Readings Over Time', fontsize=16)
    plt.xlabel('Time', fontsize=12)
    plt.ylabel('Blood Pressure (mmHg)', fontsize=12)

    # Add grid and improve appearance
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.xticks(time_numeric, time_data, rotation=45, fontsize=10)
    plt.ylim(50, 200)
    plt.yticks(fontsize=10)

    # Add a legend
    plt.legend(loc='best', fontsize=10)

    # Save and show plot
    plt.tight_layout()
    plt.savefig('blood_pressure_readings_latest.png')
    plt.show()
