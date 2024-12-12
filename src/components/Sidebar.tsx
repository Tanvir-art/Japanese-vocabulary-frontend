import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-blue-600 text-white w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:translate-x-0 md:static md:w-64 z-50`}
        >
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard" className="block hover:text-blue-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-users" className="block hover:text-blue-300">
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-lessons" className="block hover:text-blue-300">
                            Manage Lessons
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-lesson" className="block hover:text-blue-300">
                            Add Lesson
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-vocabularies" className="block hover:text-blue-300">
                            Manage Vocabularies
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-vocabulary" className="block hover:text-blue-300">
                            Add Vocabulary
                        </Link>
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
