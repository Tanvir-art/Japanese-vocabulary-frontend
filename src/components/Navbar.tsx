import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.auth); // Get user from Redux state
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">日本語 Learn</Link>
            <div className="space-x-4">
                {user ? (
                    <>
                        <Link to="/lessons">Lessons</Link>
                        <Link to="/tutorials">Tutorials</Link>
                        {user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
