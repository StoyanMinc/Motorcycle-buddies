import { useState } from "react";
import AddMaintenance from "../add-maintenance/AddMaintenance"
import { useDeleteMaintenance, useGetAllMaintenance } from "../../hooks/useMaintenance";
import { BookOpenText, Pencil, Trash2 } from 'lucide-react';
import type { EditMaintenance, Maintenance } from "../../../types/maintenance";
import ConfirmModal from "../confirm-modal/ComfirmModal";
import DetailsMaintenanceModal from "../details-Maintenance-modal/DetailsMaintenanceModal";


export default function Maintenance() {
    const { maintenances, refetch } = useGetAllMaintenance();
    const [showConfirmModal, setShowConfrimModal] = useState(false);
    const [showAddModal, setShowAddmodal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editData, setEditData] = useState<EditMaintenance | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const closeModal = () => {
        setEditData(null);
        setShowAddmodal(false);
        setShowConfrimModal(false);
        setShowDetailsModal(false);
    };

    const deleteMaintenance = useDeleteMaintenance();
    const deleteMaintenaneHandlder = async () => {
        if (!selectedId) return
        await deleteMaintenance(selectedId);
        await refetch();
        closeModal();
    }

    const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const maintenanceToDisplay = maintenances.filter((m) => {
        const motorcycleName = `${m.motorcycleId.manufacturer} ${m.motorcycleId.model}`.toLowerCase();
        const serviceType = m.serviceType.toLowerCase();
        const searchText = search.toLowerCase();

        return (
            motorcycleName.includes(searchText) ||
            serviceType.includes(searchText)
        );
    });

    return (
        <div className="flex flex-1 flex-col items-center w-full bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url('/homeImage.jpg')` }}>
            {showAddModal &&
                <AddMaintenance
                    closeModal={closeModal}
                    refetch={refetch}
                    editData={editData}
                />}
            {showConfirmModal &&
                <ConfirmModal
                    closeModal={closeModal}
                    title='Are you sure you want delete this service?'
                    confirmButtonText="Delete"
                    action={deleteMaintenaneHandlder}

                />}
            {showDetailsModal &&
                <DetailsMaintenanceModal
                    id={selectedId}
                    closeModal={closeModal}
                />}
            <div className="w-full flex flex-col items-center justify-center p-4">
                <div className="flex w-full justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Maintenance</h1>
                    <div className="flex gap-5">
                        <input
                            className="border-1 border-gray-400 rounded-md pl-2 bg-white" type="text" name="search" id="search" placeholder="Search..."
                            value={search}
                            onChange={searchHandleChange}
                        />
                        <button
                            onClick={() => setShowAddmodal(true)}
                            className="text-white bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 transform duration-300 ease-in-out cursor-pointer"
                        >Add new</button>
                    </div>
                </div>
                <table className="w-full border-1 rounded-md mt-4 bg-white/90">
                    <thead className="bg-blue-400">
                        <tr>
                            <th>N</th>
                            <th>Motorcycle</th>
                            <th>Service Type</th>
                            <th>Cost</th>
                            <th>Mileage</th>
                            <th>Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceToDisplay.map((m, index) => (
                            <tr key={m._id} className="hover:bg-gray-300">
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{`${m.motorcycleId.manufacturer} ${m.motorcycleId.model}`}</td>
                                <td className="text-center">{m.serviceType}</td>
                                <td className="text-center">{m.cost}лв.</td>
                                <td className="text-center">{m.km}km</td>
                                <td className="text-center">{m.date.split('T')[0]}</td>
                                <td className="text-center flex justify-center gap-2">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedId(m._id);
                                            setShowDetailsModal(true);
                                        }}>
                                        <BookOpenText className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                                    </button>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setEditData({
                                                _id: m._id,
                                                motorcycleId: m.motorcycleId._id,
                                                serviceType: m.serviceType,
                                                description: m.description,
                                                cost: m.cost,
                                                km: Number(m.km),
                                                date: m.date
                                            })
                                            setShowAddmodal(true);
                                        }}>
                                        <Pencil className="w-5 h-5 text-yellow-500 hover:text-yellow-700"
                                        />
                                    </button>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setSelectedId(m._id);
                                            setShowConfrimModal(true);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>
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