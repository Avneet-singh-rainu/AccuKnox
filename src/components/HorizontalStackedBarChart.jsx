import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const HorizontalStackedBarChart = () => {
    const data = {
        labels: [""],
        datasets: [
            {
                data: [750], // Example data
                backgroundColor: "#757575", // Grey
                borderRadius: 80, // Rounded bars
            },
            {
                data: [70], // Example data
                backgroundColor: "#757575", // Grey
                borderRadius: 40, // Rounded bars
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: { display: false },
            },
            y: {
                stacked: true,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <div className="w-96 h-64 p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Registry Scan
            </h3>
            <div className="flex flex-col">
                <div className="font-semibold text-md text-gray-700 mb-1">
                    Image Risk Assessment
                </div>
                <div className="bg-white rounded-lg h-32 overflow-hidden">
                    <Bar data={data} options={options} />
                </div>
                <div className="mt-4 text-center">
                    <span className="font-bold text-lg">1470</span> Total
                    Vulnerabilities
                </div>
            </div>
        </div>
    );
};

export default HorizontalStackedBarChart;
