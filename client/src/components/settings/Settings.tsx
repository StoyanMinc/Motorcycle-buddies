import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function Settings() {
    const { user } = useUserContext();
    return (
        <div className="bg-red-200 flex flex-col">
            <Link to='/change-password' className=" px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                change password
            </Link>
            <Link to='/update-user' className=" px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                update user
            </Link>
            {user?.role === 'admin' &&
                <Link to='/admin-panel' className=" px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                    admin panel
                </Link>
            }
        </div>
    );
}