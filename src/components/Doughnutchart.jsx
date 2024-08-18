import React, { useEffect, useState } from "react";
import Category from "./Category";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../store/userSlice";

const Doughnutchart = ({ addedWidgets }) => {
    const data = useSelector((state) => state.activeWidgets);
    const dispatch = useDispatch();
    const categories = data.data || [];

    useEffect(() => {
        if (addedWidgets.length > 0) {
            const updatedCategories = categories.map((category) => {
                const newWidgets = addedWidgets.filter(
                    (widget) => widget.categoryName === category.widgetName
                );
                if (newWidgets.length > 0) {
                    return {
                        ...category,
                        widgets: [...category.widgets, ...newWidgets],
                    };
                }
                return category;
            });

            dispatch(
                setCategory({
                    tempData: { ...data, categories: updatedCategories },
                })
            );
        }
    }, [addedWidgets, dispatch, categories, data]);

    return (
        <div className=" h-screen flex flex-col gap-4">
            {categories.map((category) => (
                <div key={category.id} className="w-full h-2/4 overflow-hidden">
                    <Category data={category} />
                </div>
            ))}
        </div>
    );
};

export default Doughnutchart;
