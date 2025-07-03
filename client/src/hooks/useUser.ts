import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { useUserContext } from '../contexts/UserContext';
import type { UpdateUser } from '../../types/user';

export const useRegister = () => {
    const { setLoading } = useUserContext();
    const register = async (email: string, username: string, password: string, repass: string) => {
        if (!email || !username || !password || !repass) {
            return toast.error('All fields are required!');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return
        }
        if (password !== repass) {
            return toast.error('Passwords don\'t match!');
        }
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/api/user/register`, {
                email: email,
                username: username,
                password: password
            }, { withCredentials: true });

            await axios.post(`${BASE_URL}/api/user/verify-email`,
                {}, { withCredentials: true });
            toast('Check your email for verifying your account', {
                icon: '❗',
                style: {
                    border: '1px solid orange',
                    padding: '16px',
                    color: 'orange',
                },
                duration: 4000,
            });
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return register;
}

export const useLogin = () => {
    const navigate = useNavigate()
    const { setUser, setLoading } = useUserContext();
    const login = async (email: string, password: string) => {
        if (!email || !password) {
            return toast.error('All fields are required!');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return
        }
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`,
                { email: email, password: password },
                { withCredentials: true });

            if (!response.data.isVerified) {
                await axios.post(`${BASE_URL}/api/user/verify-email`,
                    {}, { withCredentials: true });
                return toast('Check your email for verifying your account', {
                    icon: '❗',
                    style: {
                        border: '1px solid orange',
                        padding: '16px',
                        color: 'orange',
                    },
                    duration: 4000,
                });

            };

            toast.success('Login successfully!');
            setUser({
                username: response.data.username,
                email: response.data.email,
                _id: response.data._id,
                photo: response.data.photo,
                isVerified: response.data.isVerified,
                role: response.data.role,
                bio: response.data.bio,
                createdAt: response.data.createdAt
            });
            navigate('/');
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }

    }
    return login
}

export const useLogout = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await axios.get(`${BASE_URL}/api/user/logout`, { withCredentials: true });
        localStorage.removeItem('user');
        navigate('/login');
    }
    return logout
}

export const useVerifyEmail = () => {
    const navigate = useNavigate()

    const verifyEmail = async (token: string) => {
        if (!token) {
            return toast.error('No token provided!');
        }
        try {
            await axios.post(`${BASE_URL}/api/user/verify-user/${token}`,
                {}, { withCredentials: true });
            toast.success('You successfully verified your email!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return verifyEmail;
}

export const useForgotPassword = () => {
    const { setLoading } = useUserContext();
    const forgotPassword = async (email: string) => {
        if (!email) {
            return toast.error('Email is required!');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return
        }
        setLoading(true)

        try {
            await axios.post(`${BASE_URL}/api/user/forgot-password`,
                { email: email },
                { withCredentials: true });

            toast('Check your email for reset password link!', {
                icon: '❗',
                style: {
                    border: '1px solid orange',
                    padding: '16px',
                    color: 'orange',
                },
                duration: 4000,
            });

        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return forgotPassword
}

export const useResetPassword = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();
    const resetPassword = async (token: string, password: string, repass: string) => {
        if (!token) {
            return toast.error('Token is required!');
        }
        if (password !== repass) {
            return toast.error('Passwords don\'t match!');
        }
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/api/user/reset-password/${token}`,
                { password: password },
                { withCredentials: true });

            toast.success('Reset password successfuly!');
            navigate('/login');
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return resetPassword
}

export const useChangePassword = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();
    const changePassword = async (currentPassword: string, newPassword: string, rePass: string) => {
        if (!currentPassword || !newPassword || !rePass) {
            return toast.error('All fields are required!');
        }
        if (newPassword !== rePass) {
            return toast.error('Passwords don\'t match!');
        }
        setLoading(true);
        try {
            await axios.put(`${BASE_URL}/api/user/change-password`,
                { currentPassword, newPassword },
                { withCredentials: true });
            toast.success('Change password Successfully!');
            navigate('/');
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return changePassword;
}

export const useGetUser = () => {
    const { setLoading } = useUserContext();
    const getUser = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/user/get-user`, { withCredentials: true });
            return response.data
        } catch (error: any) {
            console.log('Error fetching user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }

    }
    return getUser
}

export const useUpdateUser = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();

    const updateUser = async (userData: UpdateUser) => {
        setLoading(true)
        try {
            const response = await axios.put(`${BASE_URL}/api/user/update-user`,
                { username: userData.username, bio: userData.bio },
                { withCredentials: true });
            toast.success('Successfully update user!');
            navigate('/');
            return response.data
        } catch (error: any) {
            console.log('Error fetching user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    return updateUser;
}

export const useGetUsers = () => {
    const { setLoading } = useUserContext();
    const getUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/api/admin/get-users`, { withCredentials: true });
            return response.data
        } catch (error: any) {
            console.log('Error fetching user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }

    }
    return getUsers
}

export const useDeleteUser = () => {
    const { setLoading } = useUserContext();
    const deleteUser = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${BASE_URL}/api/admin/delete-user/${id}`, { withCredentials: true });
            return response.data
        } catch (error: any) {
            console.log('Error deleting user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    return deleteUser;
}