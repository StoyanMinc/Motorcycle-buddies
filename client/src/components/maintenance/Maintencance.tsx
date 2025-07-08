import { useState } from "react";
import AddMaintenance from "../add-maintenance/AddMaintenance"
import { useGetAllMaintenance } from "../../hooks/useMaintenance";

export default function Maintenance() {
    const [showAddModal, setShowAddmodal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const closeModal = () => setShowAddmodal(false);
    const { maintenances, refetch } = useGetAllMaintenance();
    console.log(maintenances);
    return (
        <div className="flex flex-1 flex-col items-center w-full bg-gray-200">
            {showAddModal &&
                <AddMaintenance
                    closeModal={closeModal}
                    refetch={refetch}
                />}
            <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="flex w-full justify-between">
                    <h1 className="text-3xl font-bold">Maintenance</h1>
                    <div className="flex gap-5">
                        <input className="border-1 border-gray-400 rounded-md pl-2" type="text" name="search" id="search" placeholder="Search..." />
                        <button
                            onClick={() => setShowAddmodal(true)}
                            className="text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 transform duration-300 ease-in-out"
                        >Add new</button>
                    </div>
                </div>
                <table className="w-full border-1 rounded-md mt-4">
                    <thead className="bg-blue-400">
                        <tr>
                            <th>N</th>
                            <th>Motorcycle</th>
                            <th>Service Type</th>
                            <th>Cost</th>
                            <th>Mileage</th>
                            <th>Date</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenances.map((m, index) => (
                            <tr key={m._id} className="hover:bg-gray-300">
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{`${m.motorcycleId.manufacturer} ${m.motorcycleId.model}`}</td>
                                <td className="text-center">{m.serviceType}</td>
                                <td className="text-center">{m.cost}лв.</td>
                                <td className="text-center">{m.km}km</td>
                                <td className="text-center">{m.date.split('T')[0]}</td>
                                <td className="text-center">0 0 0</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}