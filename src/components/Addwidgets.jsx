import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addWidgets,
    removeWidget,
    toggleAddWidget,
} from "../store/ActiveWidgetsSlice";
import { tempData } from "../constants/Data";

export const Addwidgets = ({ isOpen }) => {
    const dispatch = useDispatch();
    const activeWidgets = useSelector((state) => state.activeWidgets.data);
    const [widgets, setWidgets] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [initialCheckedItems, setInitialCheckedItems] = useState([]);

    useEffect(() => {
        const initialCheckedItems = activeWidgets.flatMap((category) =>
            category.widgets.map((widget) => widget.id)
        );
        setCheckedItems(initialCheckedItems);
        setInitialCheckedItems(initialCheckedItems);
    }, [activeWidgets]);

    const handleWidget = (categoryName) => {
        const filtered = tempData.categories.find(
            (data) => data.widgetName === categoryName
        );
        if (filtered) {
            setWidgets(
                filtered.widgets.map((widget) => ({
                    ...widget,
                    categoryName: categoryName,
                }))
            );
        }
    };

    const handleConfirm = () => {
        const selectedWidgets = widgets.filter((widget) =>
            checkedItems.includes(widget.id)
        );

        // Remove widgets that are unchecked
        activeWidgets.forEach((category) => {
            category.widgets.forEach((widget) => {
                if (!checkedItems.includes(widget.id)) {
                    dispatch(
                        removeWidget({
                            widgetId: widget.id,
                            categoryName: widget.categoryName,
                        })
                    );
                }
            });
        });

        // add only the newly selected widgets
        dispatch(addWidgets({ widgetsToAdd: selectedWidgets }));
        dispatch(toggleAddWidget());
    };

    const handleCancel = () => {
        setCheckedItems(initialCheckedItems);
        dispatch(toggleAddWidget());
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;

        if (checked) {
            setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
        } else {
            setCheckedItems((prevCheckedItems) =>
                prevCheckedItems.filter((itemId) => itemId !== id)
            );
        }
    };

    return (
        <div
            className={`fixed inset-0 w-full h-full ${
                isOpen ? "flex" : "hidden"
            }`}
        >
            {/* left Transparent Div */}
            <div className="w-1/2 h-full bg-black bg-opacity-50"></div>

            {/* right Div for Widget Selection */}
            <div className="w-1/2 h-full bg-white relative">
                <div className="h-screen w-full flex flex-col">
                    <div className="h-10 flex justify-between bg-blue-950 items-center">
                        <div className="mx-4 text-white">Add Widgets</div>
                        <button
                            className="mx-4 text-white"
                            onClick={handleCancel}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <div>Personalize your Dashboard by adding Widgets</div>
                        <div className="grid grid-flow-col gap-4">
                            {tempData.categories.map((c) => {
                                return (
                                    <div
                                        className="cursor-pointer p-2 bg-gray-200 rounded-lg"
                                        onClick={() =>
                                            handleWidget(c.widgetName)
                                        }
                                    >
                                        {c.widgetName}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4">
                            {widgets.map((t) => (
                                <div
                                    key={t.id}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={t.id}
                                        checked={checkedItems.includes(t.id)}
                                        onChange={(e) =>
                                            handleCheckboxChange(e)
                                        }
                                    />
                                    <label htmlFor={t.id}>{t.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute flex gap-4 bottom-10 right-10">
                        <button
                            className="border border-black p-4 w-24 rounded-lg h-10 flex justify-center items-center"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="border bg-blue-950 text-white rounded-lg border-black p-4 w-24 h-10 flex justify-center items-center"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
