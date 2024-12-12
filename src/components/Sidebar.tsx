import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Clear user data from Redux store
        navigate("/login"); // Redirect to login page
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-blue-600 text-white w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:translate-x-0 md:static md:w-64 z-50`}
        >
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `block hover:text-blue-300 ${isActive ? "font-bold text-lg" : ""}`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/usersManagement"
                            className={({ isActive }) =>
                                `block hover:text-blue-300 ${isActive ? "font-bold text-lg" : ""}`
                            }
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/manageLessons"
                            className={({ isActive }) =>
                                `block hover:text-blue-300 ${isActive ? "font-bold text-lg" : ""}`
                            }
                        >
                            Manage Lessons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/vocabularyManagement"
                            className={({ isActive }) =>
                                `block hover:text-blue-300 ${isActive ? "font-bold text-lg" : ""}`
                            }
                        >
                            Manage Vocabularies
                        </NavLink>
                    </li>
                    <li
                        onClick={handleLogout}
                        className="cursor-pointer block hover:text-blue-300"
                    >
                        Logout
                    </li>
                </ul>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:hidden text-white text-xl"
                >
                    ×
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
