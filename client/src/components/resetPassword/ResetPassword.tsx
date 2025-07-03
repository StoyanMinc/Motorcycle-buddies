import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserContext } from "../../contexts/UserContext";
import { useResetPassword } from "../../hooks/useUser";

export default function ResetPassword() {
    const { token } = useParams();
    const resetPassword = useResetPassword();
    const { loading } = useUserContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepass, setShowRepass] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        password: '',
        repass: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const resetPasswordHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return
        const response = await resetPassword(token, formData.password, formData.repass);
        if (!response) return
    }
    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
            <form
                onSubmit={resetPasswordHandler}
                className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-3xl self-center font-bold">Reset you password</h3>
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
                <button className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" disabled={loading ? true : false}>{loading ? 'Wait...' : 'Reset'}</button>
            </form>
        </div>
    );
}