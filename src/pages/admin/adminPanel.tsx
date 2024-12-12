import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import HamburgerMenu from "../../components/HamburgerMenu";
import { Outlet } from "react-router-dom";

const AdminPanel: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 ">
                <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-md">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <HamburgerMenu onClick={toggleSidebar} />
                </header>

                {/* Your admin panel content goes here */}
                <div className="mt-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
