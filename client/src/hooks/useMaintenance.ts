import axios from 'axios';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { useUserContext } from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import type { CreateMaintenance, Maintenance, MaintenanceDetails } from '../../types/maintenance';


export const useGetAllMaintenance = () => {

    const [maintenances, setMaintenances] = useState<Maintenance[]>([])
    const { setLoading } = useUserContext();

    const getAllMaintenances = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/maintenance`, { withCredentials: true });
            setMaintenances(response.data);
        } catch (error: any) {
            console.log('Error fetching all maintenance:', error);
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

export const useGetSignleMaintenance = (id: string) => {

    const { setLoading } = useUserContext();
    const [maintenances, setMaintenances] = useState<MaintenanceDetails>()

    const getSingleMaintanence = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/maintenance/${id}?full=true`, { withCredentials: true });
            setMaintenances(response.data);
        } catch (error: any) {
            console.log('Error fetching signle maintenace:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getSingleMaintanence(id);
    }, [id]);

    return maintenances;
}

export const useCreateMaintenance = () => {

    const { setLoading } = useUserContext();

    const createMaintenance = async (data: CreateMaintenance) => {
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/maintenance`, data, { withCredentials: true });
        } catch (error: any) {
            console.log('Error create maintenance:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return createMaintenance;
}

export const useUpdateMaintenance = () => {
    const { setLoading } = useUserContext();

    const updateMaintenance = async (id: string, data: CreateMaintenance) => {
        setLoading(true);
        try {
            await axios.put(`${BASE_URL}/api/maintenance/${id}`, data, { withCredentials: true });
        } catch (error: any) {
            console.log('Error update maintenance:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return updateMaintenance
}

export const useDeleteMaintenance = () => {
    const { setLoading } = useUserContext();
    const deleteMaintenance = async (id: string) => {
        setLoading(true)
        try {
            await axios.delete(`${BASE_URL}/api/maintenance/${id}`, { withCredentials: true });
        } catch (error: any) {
            console.log('Error deleting maintenance:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return deleteMaintenance;
}