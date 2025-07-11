import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function Settings() {
    const { user } = useUserContext();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Settings</h2>
                <div className="space-y-4">
                    <Link
                        to="/change-password"
                        className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Change Password
                    </Link>
                    <Link
                        to="/update-user"
                        className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition"
                    >
                        Update User Info
                    </Link>
                    {user?.role === "admin" && (
                        <Link
                            to="/admin-panel"
                            className="block w-full text-center bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
