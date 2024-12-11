import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Correct path to your store file

interface PrivateRouteProps {
    children: ReactNode;
    role: string;
}

const ProtectedRoute = ({ role, children }: PrivateRouteProps) => {
    const { user } = useSelector((state: RootState) => state.auth); // Correct type for RootState

    // If no user is found or user role doesn't match, redirect to login or home
    if (!user) return <Navigate to="/login" />;
    if (user.role !== role) return <Navigate to="/" />;

    return <>{children}</>;
};

export default ProtectedRoute;
