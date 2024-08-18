import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import HorizontalStackedBarChart from "./components/HorizontalStackedBarChart";

function App() {
    return (
        <div className="bg-blue-100 min-w-full min-h-full flex flex-col h-screen">
            <NavBar />
            <Dashboard />

        </div>
    );
}

export default App;
