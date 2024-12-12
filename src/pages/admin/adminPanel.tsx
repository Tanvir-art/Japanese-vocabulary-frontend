import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import HamburgerMenu from "../../components/HamburgerMenu";

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
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800">Total Users</h2>
                        <p className="text-3xl font-bold text-blue-600">120</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800">Total Lessons</h2>
                        <p className="text-3xl font-bold text-blue-600">25</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow hover:shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800">Total Vocabularies</h2>
                        <p className="text-3xl font-bold text-blue-600">450</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
