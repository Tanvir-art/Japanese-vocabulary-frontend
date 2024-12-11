import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav className="bg-blue-600 p-4 text-white flex justify-between">
                <Link to="/" className="text-2xl font-bold">日本語 Learn</Link>
                <div className="space-x-4">
                    <Link to="/lessons">Lessons</Link>
                    <Link to="/tutorials">Tutorials</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
