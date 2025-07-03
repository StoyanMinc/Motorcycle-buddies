import { useParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/useUser";
import toast from 'react-hot-toast'


export default function VerifyEmail() {
    const token = useParams().token;
    const verifyEmail = useVerifyEmail();
    const verifyEmailHandler = async () => {
        try {
            if (!token) {
                return toast.error('No Token provided!');
            }
            await verifyEmail(token)
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return (
        <div className="flex flex-1 items-center justify-center w-full h-full bg-gray-200">
            <button
                onClick={verifyEmailHandler}
                className="bg-blue-400 px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out">Verify your email</button>
        </div>
    );
}