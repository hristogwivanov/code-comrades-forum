import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If the user is authenticated, allow access to the route
    return <Outlet />;
};
