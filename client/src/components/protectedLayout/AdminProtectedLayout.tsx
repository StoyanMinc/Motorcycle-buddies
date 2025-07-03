import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function AdminProtectedLayout() {
    const { user } = useUserContext();

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Not an admin
    if (user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
