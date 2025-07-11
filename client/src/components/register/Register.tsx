import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Loading from "../loading/Loading";

import { useUserContext } from "../../contexts/UserContext";
import { useRegister } from "../../hooks/useUser";

export default function Register() {

    const { loading } = useUserContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepass, setShowRepass] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        repass: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const register = useRegister();
    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await register(formData.email, formData.username, formData.password, formData.repass);
        if (!response) return
    };

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/homeImage.jpg')` }}>
                <form
                    onSubmit={registerHandler}
                    className="bg-white/70 w-[30%] p-10 rounded-xl flex flex-col gap-4"
                >
                    <h3 className="text-4xl self-center font-bold">Register</h3>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            className="border-1 border-gray-400 rounded-md px-4 py-2"
                            placeholder="example@email.com"
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            className="border-1 border-gray-400 rounded-md px-4 py-2"
                            placeholder="Ivan Ivanov"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                            placeholder="**********"
                            type={showPassword ? 'text' : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    <div className="relative flex flex-col">
                        <label htmlFor="repass">Repeat password</label>
                        <input
                            className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                            placeholder="**********"
                            type={showRepass ? 'text' : "password"}
                            id="repass"
                            name="repass"
                            value={formData.repass}
                            onChange={handleChange}
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                            onClick={() => setShowRepass((prev) => !prev)}
                        >{showRepass ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                    <button className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out">Register</button>
                    <p>You already have an account? <Link to={'/login'} className="text-blue-400 font-bold ml-1">login here</Link></p>
                </form>
            </div>
        </>
    );
}