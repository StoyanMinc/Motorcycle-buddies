import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { useUserContext } from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import type { CreateMaintenance, Maintenance } from '../../types/maintenance';


export const useGetAllMaintenance = () => {

    const [maintenances, setMaintenances] = useState<Maintenance[]>([])
    const { setLoading } = useUserContext();

    const getAllMaintenances = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/maintenance`, { withCredentials: true });
            setMaintenances(response.data);
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllMaintenances();
    }, []);

    return { maintenances, refetch: getAllMaintenances };
}

export const useCreateMaintenance = () => {

    const navigate = useNavigate();
    const { setLoading } = useUserContext();

    const createMaintenance = async (data: CreateMaintenance) => {
        setLoading(true);
        try {
            const result = await axios.post(`${BASE_URL}/api/maintenance`, data, { withCredentials: true });
            console.log(result);
            navigate('/maintenance');
        } catch (error: any) {
            console.log('Error fetching motorcycles:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return createMaintenance;
}