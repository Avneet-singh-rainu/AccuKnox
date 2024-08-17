import { createSlice } from "@reduxjs/toolkit";

const activeWidgetsSlice = createSlice({
    name: "activeWidgets",
    initialState: {
        data: [
            {
                id: "cspm-dashboard",
                name: "CSPM Executive Dashboard",
                widgetName: "CSPM",
                widgets: [
                    {
                        id: "cloud-accounts",
                        name: "Cloud Accounts",
                        content: "Connected (2) ,Not Connected (0)",
                        categoryName: "CSPM",
                    },
                ],
            },
            {
                id: "cwpp-dashboard",
                name: "CWPP Dashboard",
                widgetName: "CWPP",
                widgets: [
                    {
                        id: "namespace-alerts",
                        name: "Top 5 Namespace Specific Alerts",
                        content: "No Graph data available!",
                        categoryName: "CWPP",
                    },
                ],
            },
            {
                id: "registry-scan",
                name: "Registry Scan",
                widgetName: "Image",
                widgets: [
                    {
                        id: "image-security-issues",
                        name: "Image Security Issues",
                        content: "2 Total Images,Critical (2),High (2)",
                    },
                ],
            },
        ],
    },
    reducers: {
        addWidgets: (state, action) => {
            const { widgetsToAdd } = action.payload;

            widgetsToAdd.forEach((newWidget) => {
                // Find the category that matches the widget's categoryName
                const category = state.data.find(
                    (cat) => cat.widgetName === newWidget.categoryName
                );

                if (category) {
                    // Check if the widget is already in the category
                    const widgetExists = category.widgets.some(
                        (widget) => widget.id === newWidget.id
                    );

                    if (!widgetExists) {
                        // If the widget does not exist, add it to the category
                        category.widgets.push(newWidget);
                    }
                }
            });
        },
        deleteWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.data.find((cat) => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter(
                    (widget) => widget.id !== widgetId
                );
            }
        },
        removeWidget(state, action) {
            const { widgetId, categoryName } = action.payload;
            state.data = state.data.map((category) => {
                if (category.widgetName === categoryName) {
                    return {
                        ...category,
                        widgets: category.widgets.filter(
                            (widget) => widget.id !== widgetId
                        ),
                    };
                }
                return category;
            });
        },
    },
});

export const { addWidgets, deleteWidget, removeWidget } =
    activeWidgetsSlice.actions;
export default activeWidgetsSlice.reducer;
