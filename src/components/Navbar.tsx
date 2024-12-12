import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth); // Get user from Redux state
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-blue-700 p-4 text-white">
            <div className="flex justify-between items-center">
                {/* Brand */}
                <Link to="/" className="text-2xl font-bold">
                    日本語 Learn
                </Link>

                {/* Hamburger Menu */}
                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                {/* Links for larger screens */}
                <div className="hidden md:flex space-x-4">
                    {user ? (
                        <>
                            <Link to="/lessons">Lessons</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Dropdown Menu for small screens */}
            {menuOpen && (
                <div className="mt-4 md:hidden">
                    {user ? (
                        <>
                            <Link
                                to="/lessons"
                                className="block px-4 py-2 hover:bg-blue-600 rounded"
                                onClick={toggleMenu}
                            >
                                Lessons
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }}
                                className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={toggleMenu}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
