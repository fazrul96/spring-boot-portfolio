import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';  // Import the time scale

import 'chartjs-adapter-date-fns'; // Ensure the date adapter is imported

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale // Register the TimeScale
);

const DonationTrendChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div>No donation data available.</div>;
    }

    // Process the data for the chart
    const donationData = data.map(d => ({
        x: new Date(d.date),  // Date object for the x-axis
        y: d.donation
    }));

    // Chart.js data structure
    const chartData = {
        datasets: [{
            label: 'Donations Over Time',
            data: donationData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    };

    // Chart.js options to configure x and y axes
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Donation Trend Over Time'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                type: 'time',  // Set x-axis to 'time' scale
                time: {
                    unit: 'day',
                    tooltipFormat: 'P', // Use 'P' for the full date format (avoids the error)
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Donation Amount ($)'
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 100
                }
            }
        }
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default DonationTrendChart;
