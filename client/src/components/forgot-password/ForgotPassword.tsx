import { useState } from "react";

import { useUserContext } from "../../contexts/UserContext";
import { useForgotPassword } from "../../hooks/useUser";

export default function ForgotPassword() {
    const { loading } = useUserContext();
    const forgotPassword = useForgotPassword();
    const [email, setEmail] = useState<string>('');

    const forgotPasswordHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await forgotPassword(email);
        if (!response) return
    };
    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/homeImage.jpg')` }}
        >
            <form
                onSubmit={forgotPasswordHandler}
                className="bg-white/80 w-[30%] p-10 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-4xl self-center font-bold">Reset password</h3>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        placeholder="example@email.com"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" disabled={loading ? true : false}>{loading ? 'Wait...' : 'Login'}</button>
            </form>
        </div>
    );
}