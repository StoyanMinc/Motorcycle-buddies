import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { useUserContext } from '../contexts/UserContext';
import type { CreateMotorcycleType, Motorcycle } from '../../types/motorcycle'
import { useEffect, useState } from 'react';

export const useGetAllMotorcycles = () => {

    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
    const { setLoading } = useUserContext();

    const getAllMotorcycles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/motorcycles`, { withCredentials: true });
            setMotorcycles(response.data);
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllMotorcycles();
    }, []);

    return { motorcycles, refetch: getAllMotorcycles };
}

export const useGetCurrentMotorcycles = () => {

    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
    const { setLoading } = useUserContext();

    const getAllMotorcycles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/motorcycles/current`, { withCredentials: true });
            setMotorcycles(response.data);
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllMotorcycles();
    }, []);

    return motorcycles;
}

export const useGetMotorcycle = (id: string) => {
    const { setLoading } = useUserContext();
    const [motorcycle, setMotorcycle] = useState<Motorcycle>();
    useEffect(() => {
        const getMotorcycle = async (id: string) => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/api/motorcycles/${id}`, { withCredentials: true });
                setMotorcycle(response.data);
            } catch (error: any) {
                console.log('Error fetching motorcycle:', error);
                toast.error(error.response.data.message);
            } finally {
                setLoading(false)
            }
        }
        getMotorcycle(id);
    }, [])

    return motorcycle;
}

export const useCreateMotorycle = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();
    const createMotorcycle = async (motorcycleData: CreateMotorcycleType) => {
        if (!motorcycleData.manufacturer || !motorcycleData.model || !motorcycleData.year || !motorcycleData.boughtYear || !motorcycleData.image) {
            return toast.error('Motorcycle data and image are required!');
        }

        const formData = new FormData();
        formData.append("manufacturer", motorcycleData.manufacturer);
        formData.append("model", motorcycleData.model);
        formData.append("description", motorcycleData.description);
        formData.append("year", motorcycleData.year);
        formData.append("boughtYear", motorcycleData.boughtYear);
        formData.append("soldYear", motorcycleData.soldYear);
        formData.append("image", motorcycleData.image);
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/api/motorcycles`,
                formData,
                { withCredentials: true });
            toast.success('Post bike successfully!');
            navigate('/motorcycles');
            return response.data
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return createMotorcycle;
}

export const useUpdateMotorcycle = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();
    const updateMotorcycle = async (id: string, motorcycleData: CreateMotorcycleType) => {
        if (!id || !motorcycleData) {
            return toast.error('Motorcycle data and id are required!');
        }
        const formData = new FormData();
        formData.append("manufacturer", motorcycleData.manufacturer);
        formData.append("model", motorcycleData.model);
        formData.append("description", motorcycleData.description);
        formData.append("year", motorcycleData.year);
        formData.append("boughtYear", motorcycleData.boughtYear);
        formData.append("soldYear", motorcycleData.soldYear);
        if (motorcycleData.image instanceof File) {
            formData.append("image", motorcycleData.image);
        }
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/api/motorcycles/${id}`,
                formData,
                { withCredentials: true });
            toast.success('Update bike successfully!');
            navigate('/motorcycles');
            return response.data
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return updateMotorcycle;
}

export const useDeleteMotorcycle = () => {
    const { setLoading } = useUserContext();
    const navigate = useNavigate();
    const deleteMotorcycle = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${BASE_URL}/api/motorcycles/${id}`, { withCredentials: true });
            navigate('/motorcycles');
            return response
        } catch (error: any) {
            console.log('Error deleting motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return deleteMotorcycle;
}