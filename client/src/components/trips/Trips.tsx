import { useGetAllTrips } from "../../hooks/useTrips";
import { useGoogleMaps, useMarkers } from "../../hooks/useGoogleMaps";
import { Link } from "react-router-dom";

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}
export default function Trips() {
    const { trips } = useGetAllTrips();

    const { mapRef } = useGoogleMaps("map", { lat: 42.7339, lng: 25.4858 }, 7.9);

    useMarkers(mapRef, trips);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800">My Riding History</h1>
                <div className="flex gap-5">
                    <Link to={'/trips-list'} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Trips list
                    </Link>
                    <Link to={'/trips/add'} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Add New Place
                    </Link>
                </div>
            </div>
            <div id="map" className="flex-1 w-full" />
        </div>
    );
}
