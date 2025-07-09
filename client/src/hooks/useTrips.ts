import axios from "axios";
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
import type { Trip } from '../../types/trips'

import { useEffect, useState } from "react"
import { useUserContext } from "../contexts/UserContext";

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