import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Loading from "../loading/Loading";
import { useLogout } from "../../hooks/useUser";

export default function Home() {
    const { loading, user } = useUserContext();
    const logout = useLogout();

    return (
        <>
            {loading && <Loading />}
            <div className="fixed flex">
                <nav className="flex gap-4 m-2">
                    <Link to='/change-password' className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                        change password
                    </Link>
                    <Link to='/update-user' className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                        update user
                    </Link>
                    {user?.role === 'admin' &&
                        <Link to='/admin-panel' className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                            admin panel
                        </Link>
                    }
                    <button
                        onClick={() => logout()}
                        className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">
                        logout
                    </button>
                </nav>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center w-full h-[100%] bg-gray-200">
                Home page
            </div>
        </>
    );
}