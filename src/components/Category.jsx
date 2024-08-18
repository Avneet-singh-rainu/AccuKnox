import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteWidget, toggleAddWidget } from "../store/ActiveWidgetsSlice";
import HorizontalStackedBarChart from "./HorizontalStackedBarChart";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const Category = ({ data: initialCategory }) => {
    const dispatch = useDispatch();

    const handleDelete = (widgetId) => {
        dispatch(deleteWidget({ categoryId: initialCategory.id, widgetId }));
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                position: "right",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0,0,0,0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
        maintainAspectRatio: false,
        cutout: "65%",
        circumference: 360,
        elements: {
            arc: {
                borderWidth: 0,
                borderColor: "#fff",
                minAngle: 1,
            },
        },
    };

    const stackedBarOptions = {
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: { display: false },
                stacked: true,
                barPercentage: 0.5,
            },
            y: {
                grid: {
                    display: false,
                },
                stacked: true,
                categoryPercentage: 0.8,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    const colors = [
        "#A5A0EA", // Very Light Blue
        "#6C63FF", // Blue
        "rgba(128, 0, 0, 1)", // Mehroon
        "#20B714", // Green
        "rgba(255, 206, 86, 1)", // Yellow
        "rgba(169, 169, 169, 1)", // Gray
        "rgba(165, 42, 42, 1)", // Brown
    ];

    const parseContent = (content) => {
        return content
            .split(",")
            .map((line) => line.trim())
            .filter((line) => line);
    };

    // calculate the number of empty slots needed to make 3 widgets per row
    const widgetCount = initialCategory.widgets?.length || 0;
    const emptySlots = Math.max(0, 3 - widgetCount);

    return (
        <div className="h-full p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="font-semibold text-lg text-gray-800 mb-1">
                {initialCategory?.name}
            </div>
            <div className="w-full h-5/6 flex gap-6 justify-around">
                {initialCategory.widgets?.map((widget, k) => {
                    const labels = parseContent(widget.content);
                    const chartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: widget.name,
                                data: widget.values,
                                backgroundColor: colors.slice(0, labels.length),
                            },
                        ],
                    };

                    const stackChartData = {
                        labels: [" "],
                        datasets: widget.values.map((value, index) => ({
                            label: labels[index] || `Label ${index + 1}`,
                            data: [value],
                            backgroundColor: colors[index % colors.length],
                            borderRadius: 950,
                            barThickness: 20,
                        })),
                    };
                    const sum = widget?.values?.reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue,
                        0
                    );

                    return (
                        <div
                            key={k}
                            className="bg-white w-[30%] p-4 rounded-2xl shadow-md flex flex-col items-center "
                        >
                            <div className="flex justify-between w-full mb-2">
                                <div className="text-gray-700 font-medium">
                                    {widget.name}
                                </div>
                                <div
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDelete(widget.id)}
                                >
                                    &times;
                                </div>
                            </div>
                            <div className="w-full h-full">
                                {chartData.datasets[0].data.length <= 1 ? (
                                    <div className="w-4/4 h-3/4 flex flex-col items-center">
                                        <img
                                            src="./graph.svg"
                                            alt="No data available"
                                            className="w-full h-full object-contain"
                                        />
                                        <p className="text-gray-400">
                                            No Graph data available!
                                        </p>
                                    </div>
                                ) : widget.chartType === "Doughnut" ? (
                                    <Doughnut
                                        className="h-full"
                                        data={chartData}
                                        options={doughnutOptions}
                                    />
                                ) : widget.chartType === "Stack" ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="h-5 font-semibold text-lg">
                                            {sum + " " + widget.about}
                                        </div>
                                        <div>
                                            <Bar
                                                style={{ height: "120px" }}
                                                className="flex"
                                                data={stackChartData}
                                                options={stackedBarOptions}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    );
                })}

                {/* add empty slots with add widget button */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="bg-white w-[30%] p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
                    >
                        <button
                            className="text-gray-500 font-semibold border-2 py-2 px-4 rounded-lg hover:bg-blue-100"
                            onClick={() => dispatch(toggleAddWidget())}
                        >
                            + Add Widget
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
