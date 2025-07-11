import { useState } from "react";
import { useDeleteTrip, useGetAllTrips } from "../../hooks/useTrips";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function TripList() {
    const { trips, refetch } = useGetAllTrips();
    const [search, setSearch] = useState('');

    const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const tripsToDisplay = trips.filter((trip) => {
        const motorcycleName = `${trip.motorcycleId.manufacturer} ${trip.motorcycleId.model}`.toLowerCase();
        const address = trip.address.toLowerCase();
        const tripTitle = trip.tripTitle.toLowerCase();
        const searchText = search.toLowerCase();

        return (
            motorcycleName.includes(searchText) ||
            address.includes(searchText) ||
            tripTitle.includes(searchText)
        );
    });

    const deleteTrip = useDeleteTrip();
    const deleteTripHandler = async (id: string) => {
        await deleteTrip(id);
        await refetch();
    }
    return (
        <div className="flex flex-1 flex-col items-center w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/homeImage.jpg')` }}
        >

            <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="flex w-full justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Maintenance</h1>
                    <div className="flex gap-5">
                        <input
                            className="border-1 border-gray-400 rounded-md pl-2 bg-white" type="text" name="search" id="search" placeholder="Search..."
                            value={search}
                            onChange={searchHandleChange}
                        />
                        <Link
                            to={'/trips/add'}
                            className="text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 transform duration-300 ease-in-out cursor-pointer"
                        >
                            Add new
                        </Link>
                    </div>
                </div>
                <table className="w-full border-1 rounded-md mt-4 bg-white/90">
                    <thead className="bg-blue-400">
                        <tr>
                            <th>N</th>
                            <th>Trip</th>
                            <th>Address</th>
                            <th>Motorcycle</th>
                            <th>Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tripsToDisplay.map((trip, index) => (
                            <tr key={trip._id} className="hover:bg-gray-300">
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{trip.tripTitle}</td>
                                <td className="text-center">{trip.address}</td>
                                <td className="text-center">{`${trip.motorcycleId.manufacturer} ${trip.motorcycleId.model}`}</td>
                                <td className="text-center">{trip.date.split('T')[0]}</td>
                                <td className="text-center flex justify-center gap-2">
                                    <Link to={`/trips/edit/${trip._id}`}
                                        className="cursor-pointer"
                                    >
                                        <Pencil className="w-5 h-5 text-yellow-500 hover:text-yellow-700"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => deleteTripHandler(trip._id)}
                                        className="cursor-pointer"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}