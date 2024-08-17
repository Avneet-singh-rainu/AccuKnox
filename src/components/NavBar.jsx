import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
const NavBar = () => {
    return (
        <nav className="p-4 flex justify-between items-center bg-white h-12">
            <div className="">
                <span className="text-gray-500"> Home</span>
                <ChevronRightIcon className="text-gray-500" />
                <span className="text-blue-900 font-bold ">DashBoard V2</span>
            </div>
            <div className="relative w-1/3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchOutlinedIcon className="text-gray-500" />
                </span>
                <input
                    type="text"
                    className="text-black border border-blue-200 rounded-lg w-full p-2 pl-10"
                    placeholder="Search anything..."
                />
            </div>
            <button className="bg-white text-black px-4 py-2 rounded">
                <NotificationsActiveOutlinedIcon className="text-gray-500" />
            </button>
        </nav>
    );
};

export default NavBar;
