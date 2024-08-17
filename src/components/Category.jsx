import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteWidget } from "../store/ActiveWidgetsSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const Category = ({ data: initialCategory }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.activeWidgets);

    const handleDelete = (widgetId) => {
        dispatch(deleteWidget({ categoryId: initialCategory.id, widgetId }));
    };

    const chartOptions = {
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
    };

    const colors = [
        "rgba(54, 162, 235)", // Blue
        "rgba(255, 159, 64)", // Orange
        "rgba(75, 192, 192)", // Teal
        "rgba(255, 99, 132)", // Red
        "rgba(255, 206, 86)", // Yellow
        "rgba(153, 102, 255)", // Purple
    ];

    const parseContent = (content) => {
        return content
            .split(",")
            .map((line) => line.trim())
            .filter((line) => line);
    };

    return (
        <div className="mr-10 w-full h-full p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="font-semibold text-lg text-gray-800 mb-4">
                {initialCategory?.name}
            </div>
            <div className="w-full h-auto flex gap-4">
                {initialCategory.widgets?.map((widget) => {
                    const labels = parseContent(widget.content);
                    const chartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: widget.name,
                                data: new Array(labels.length).fill(1),
                                backgroundColor: colors.slice(0, labels.length),
                            },
                        ],
                    };

                    return (
                        <div
                            key={widget.id}
                            className="bg-white w-1/4 p-4 rounded-lg shadow-md flex flex-col items-center"
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
                            <div className="w-full h-32">
                                <Doughnut
                                    data={chartData}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
