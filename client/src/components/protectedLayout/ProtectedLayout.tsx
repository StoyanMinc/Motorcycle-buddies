import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function ProtectedLayout() {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
