import React, { useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Doughnut from "./Doughnutchart";
import { Addwidgets } from "./Addwidgets";
import {
    addWidgets,
    removeWidget,
    toggleAddWidget,
} from "../store/ActiveWidgetsSlice";

import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
    //const [isOpen, setIsOpen] = useState(false);
    const isOpen = useSelector((state) => state.activeWidgets.isopen);
    const dispatch = useDispatch();
    //console.log(isopen.activeWidgets.isopen);
    const [addedWidgets, setAddedWidgets] = useState([]);

    const handleAddWidgets = (newWidgets) => {
        setAddedWidgets((prevWidgets) => [...prevWidgets, ...newWidgets]);
    };

    return (
        <div className="relative p-4">
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">CNAPP Dashboard</div>
                <div className="flex items-center gap-4">
                    <div
                        className="bg-white border border-gray-300 rounded-lg font-semibold  w-36 h-10 flex items-center justify-center cursor-pointer hover:bg-indigo-900 hover:text-white"
                        onClick={() => dispatch(toggleAddWidget())}
                    >
                        Add Widget +
                    </div>
                    <div className="bg-white border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer">
                        <LoopIcon />
                    </div>
                    <div className="bg-white border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer">
                        <MoreVertIcon />
                    </div>
                    <div className="flex items-center bg-white rounded-md border-2 border-blue-800 p-1">
                        <AccessTimeOutlinedIcon
                            style={{ color: "blue" }}
                            className="text-gray-500 mr-1 border-l-2 border-white"
                        />
                        <select
                            name="days"
                            id="days"
                            className="font-semibold text-blue-700 border-l-2 border-blue-700 outline-none bg-transparent"
                        >
                            <option
                                value="Last 2 days "
                                className="text-blue-950"
                            >
                                Last 2 days
                            </option>
                            <option
                                value="Last 10 days"
                                className="font-semibold text-blue-950"
                            >
                                Last 10 days
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <Addwidgets isOpen={isOpen} onAddWidgets={handleAddWidgets} />
            <Doughnut addedWidgets={addedWidgets} />
        </div>
    );
};

export default Dashboard;
