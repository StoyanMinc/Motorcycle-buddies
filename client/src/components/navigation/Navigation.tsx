import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Loading from "../loading/Loading";
import { useLogout } from "../../hooks/useUser";

export default function Navigation() {
    const { loading, user } = useUserContext();
    const logout = useLogout();

    return (
        <>
            {loading && <Loading />}
            <div className="fixed flex p-2 items-center justify-between w-full bg-white h-[70px] z-50">
                <div>
                    <Link to={'/'}>
                        <img className="w-20 h-auto cursor-pointer" src="logo.webp" alt="logo" />
                    </Link>
                </div>
                {user ? (<div className="flex gap-3 items-center">
                    <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/motorcycles'}>My motorcycles</Link>
                    <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/trips'}>Trips</Link>
                    <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/maintenance'}>Мaintenance</Link>
                    <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/motorcycles/add'}>Add Bike</Link>
                    <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/settings'}>Settings</Link>
                    <button
                        onClick={() => logout()}
                        className="bg-red-200 px-2 py-1 rounded-md hover:bg-red-300 cursor-pointer font-bold">
                        Logout
                    </button>
                </div>)
                    : (<div className="flex gap-3">
                        <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/login'}>Login</Link>
                        <Link className="bg-white px-2 py-1 rounded-md hover:bg-gray-200 font-bold" to={'/register'}>Register</Link>
                    </div>)}
            </div>
        </>
    );
}