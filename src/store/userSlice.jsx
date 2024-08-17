import { createSlice } from "@reduxjs/toolkit";
import { tempData } from "../constants/Data";

const userSlice = createSlice({
    name: "category",
    initialState: {
        tempData,
    },
    reducers: {
        setCategory: (state, action) => {
            state.tempData = action.payload;
        },
        addWidget: (state, action) => {
            const { widgetsToAdd } = action.payload;
            state.tempData.categories = state.tempData.categories.map(
                (category) => {
                    const newWidgets = widgetsToAdd.filter(
                        (widget) => widget.categoryName === category.widgetName
                    );

                    if (newWidgets.length > 0) {
                        return {
                            ...category,
                            widgets: [...category.widgets, ...newWidgets],
                        };
                    }

                    return category;
                }
            );
        },
    },
});

export const { setCategory, addWidget } = userSlice.actions;
export default userSlice.reducer;
