import axios from "axios";
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
import type { CreateTrip, Trip } from '../../types/trips'

import { useEffect, useState } from "react"
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const useGetAllTrips = () => {

    const [trips, setTrips] = useState<Trip[]>([])
    const { setLoading } = useUserContext();

    const getAllTrips = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/trips`, { withCredentials: true });
            setTrips(response.data);
        } catch (error: any) {
            console.log('Error fetching trips:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllTrips();
    }, []);

    return { trips, refetch: getAllTrips };
}

export const useGetSignleTrip = (id: string) => {

    const { setLoading } = useUserContext();
    const [trip, setTrip] = useState<Trip>()

    const getSingleTrip = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/trips/${id}?full=true`, { withCredentials: true });
            setTrip(response.data);
        } catch (error: any) {
            console.log('Error fetching signle maintenace:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getSingleTrip(id);
    }, [id]);

    return trip;
}

export const useCreateTrip = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();

    const createTrip = async (data: CreateTrip) => {
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/trips`, data, { withCredentials: true });
            toast.success('Successfully add trip');
            navigate('/trips')
        } catch (error: any) {
            console.log('Error create trip:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }
    return createTrip;
}

export const useUpdateTrip = () => {
    const navigate = useNavigate();
    const { setLoading } = useUserContext();

    const updateTrip = async (id: string, data: CreateTrip) => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/api/trips/${id}`, data, { withCredentials: true });
            toast.success(response.data.message);
            navigate('/trips');
        } catch (error: any) {
            console.log('Error update trip:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    return updateTrip
}

export const useDeleteTrip = () => {
    const { setLoading } = useUserContext();
    const deleteTrip = async (id: string) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${BASE_URL}/api/trips/${id}`, { withCredentials: true });
            toast.success(response.data.message)
        } catch (error: any) {
            console.log('Error deleting trip:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return deleteTrip;
}