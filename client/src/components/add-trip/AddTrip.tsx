import { useEffect, useState } from "react";
import type { CreateTrip } from "../../../types/trips";
import { useGetAllMotorcycles } from "../../hooks/useMotorcycles";
import { useInteractiveMap } from "../../hooks/useGoogleMaps";
import { useCreateTrip } from "../../hooks/useTrips";

export default function AddTrip() {
    const [formData, setFormData] = useState<CreateTrip>({
        motorcycleId: '',
        tripTitle: '',
        address: '',
        friends: '',
        gps: '',
        date: ''
    })

    const { coords, geocodeAddress } = useInteractiveMap('trip-map', { lat: 42.7339, lng: 25.4858 }, 7);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, gps: coords }));
    }, [coords]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const createTrip = useCreateTrip();
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTrip(formData)
    }
    const { motorcycles } = useGetAllMotorcycles();
    return (
        <div className="absolute flex items-center justify-center w-full gap-5 p-6">
            <form
                onSubmit={submitHandler}
                className="bg-white w-full p-4 rounded-xl shadow-md flex flex-col gap-4.5"
            >
                <h3 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Add Trip</h3>

                <div className="flex flex-col">
                    <label htmlFor="motorcycleId" className="mb-1 font-semibold text-gray-700">
                        Choose Motorcycle
                    </label>
                    <select
                        name="motorcycleId"
                        id="motorcycleId"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        value={formData.motorcycleId}
                    >
                        <option value="">-</option>
                        {motorcycles.map((motorcycle) => (
                            <option key={motorcycle._id} value={motorcycle._id}>
                                {`${motorcycle.manufacturer} ${motorcycle.model}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="tripTitle" className="mb-1 font-semibold text-gray-700">
                        Trip Title
                    </label>
                    <input
                        id="tripTitle"
                        name="tripTitle"
                        type="text"
                        value={formData.tripTitle}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Enter trip title"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-1 font-semibold text-gray-700">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Type address and click Find"
                        onChange={(e) => {
                            handleChange;
                            const newAddress = e.target.value;
                            setFormData((prev) => ({ ...prev, address: newAddress }));
                        }}
                        onBlur={() => {
                            geocodeAddress(formData.address);
                        }}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="friends" className="mb-1 font-semibold text-gray-700">
                        Friends
                    </label>
                    <textarea
                        id="friends"
                        name="friends"
                        rows={3}
                        value={formData.friends}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Who’s joining you?"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="date" className="mb-1 font-semibold text-gray-700">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                </div>



                <div className="text-sm text-gray-600 select-none">
                    <strong>Selected GPS:</strong> {formData.gps}
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 shadow-md transition duration-300"
                >
                    Add Trip
                </button>
            </form>

            <div id="trip-map" className="w-full h-[calc(100vh-100px)] rounded shadow" />
        </div>
    );
}