import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserContext } from "../../contexts/UserContext";
import { useChangePassword } from "../../hooks/useUser";

export default function ChangePassword() {
    const { loading } = useUserContext();
    const changePassword = useChangePassword();
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showRepass, setShowRepass] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        repass: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const changePasswordHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await changePassword(formData.currentPassword, formData.newPassword, formData.repass);
        if (!response) return
    }
    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
            <form
            onSubmit={changePasswordHandler}
                className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-3xl self-center font-bold">Change password</h3>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="oldPassword">Current password</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        placeholder="**********"
                        type={showCurrentPassword ? 'text' : 'password'}
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                    />
                    <span
                        className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                    >{showCurrentPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="newPassword">New password</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        placeholder="**********"
                        type={showNewPassword ? 'text' : 'password'}
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                    <span
                        className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                    >{showNewPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="repass">Repeat new password</label>
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