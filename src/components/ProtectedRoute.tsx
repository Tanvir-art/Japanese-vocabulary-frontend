import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Correct path to your store file

interface ProtectedRouteProps {
    children: ReactNode;
    role: string;
}

const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
    const { user } = useSelector((state: RootState) => state.auth);

    // If no user is logged in, redirect to login page
    if (!user) return <Navigate to="/login" />;

    // If user has 'admin' role, redirect to dashboard
    if (role === "admin" && user.role === "admin") {
        return <>{children}</>;
    }

    // If user has 'user' role, redirect to lessons
    if (role === "user" && user.role === "user") {
        return <>{children}</>;
    }

    // If user role doesn't match, redirect to login page
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
