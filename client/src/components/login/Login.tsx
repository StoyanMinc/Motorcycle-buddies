import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Loading from "../loading/Loading";

import { useUserContext } from "../../contexts/UserContext";
import { useLogin } from "../../hooks/useUser";

export default function Login() {
    const login = useLogin();
    const { loading } = useUserContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await login(formData.email, formData.password);
        if (!response) return
    };

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
                <form
                    onSubmit={loginHandler}
                    className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4"
                >
                    <h3 className="text-4xl self-center font-bold">Login</h3>
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

                    <div className="relative flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border-1 border-gray-400 rounded-md px-4 py-2"
                            placeholder="**********"
                            type={showPassword ? 'text' : 'password'}
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
                    <button className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" disabled={loading ? true : false}>{loading ? 'Wait...' : 'Login'}</button>
                    <p>You don't have an account? <Link to={'/register'} className="text-blue-400 font-bold ml-1">Register here</Link></p>
                    <Link to={'/forgot-password'} className="text-blue-400 self-center hover:underline">Forgot password ?</Link>
                </form>
            </div>
        </>
    );
}