import { useEffect, useState } from "react";
import { useGetUser, useUpdateUser } from "../../hooks/useUser";

export default function UpdateUser() {
    const user = useGetUser();
    const updateUser = useUpdateUser();
    const [userData, setUserData] = useState({
        username: '',
        bio: ''
    })

    useEffect(() => {
        (async () => {
            const userData = await user();
            setUserData({
                username: userData.username,
                bio: userData.bio
            });
        })()
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const updateUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await updateUser(userData);
        if(response) return;
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
            <form
            onSubmit={updateUserHandler}
                className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-4xl self-center font-bold">Update user</h3>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={userData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="bio">Bio</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        type="text"
                        id="bio"
                        name="bio"
                        defaultValue={userData.bio}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" >
                    Update user
                </button>
            </form>
        </div>
    );
}