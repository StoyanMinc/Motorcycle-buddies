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

    useEffect(() => {
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
        getAllMotorcycles();
    }, [setLoading])

    return motorcycles;
}

export const useCreateMotorycle = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();
    const createMotorcycle = async (motorcycleData: CreateMotorcycleType) => {
        if (!motorcycleData.manufacturer || !motorcycleData.model || !motorcycleData.year || !motorcycleData.boughtYear || !motorcycleData.image) {
            return toast.error('Motorcycle data and image are required!');
        }
        console.log(motorcycleData);
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
        }
    }
    return createMotorcycle;
}