import { useUserContext } from "../../contexts/UserContext";
import { useGetSignleMaintenance } from "../../hooks/useMaintenance";
import Loading from "../loading/Loading";

interface DetailsModalProps {
    id: string | null,
    closeModal: () => void
}
export default function DetailsMaintenanceModal({
    id,
    closeModal
}: DetailsModalProps) {
    const { loading } = useUserContext();
    if (!id) return;
    const maintenence = useGetSignleMaintenance(id);

    return (
        <>
            {loading || !maintenence ? <Loading /> : (
                <div
                    onClick={closeModal}
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-xl relative"
                    >

                        {/* Close Button */}
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer">
                            ✕
                        </button>

                        {/* Motorcycle Info */}
                        <div className="flex items-center gap-4 border-b pb-4 mb-4">
                            <img src={maintenence.motorcycleId.image} alt="motorcycle" className="w-24 h-24 object-cover rounded-lg border" />
                            <div>
                                <h2 className="text-xl font-bold">
                                    {maintenence.motorcycleId.manufacturer} {maintenence.motorcycleId.model}
                                </h2>
                                <p className="text-gray-500">Year: {maintenence.motorcycleId.year}</p>
                                <p className="text-gray-500">Bought: {maintenence.motorcycleId.boughtYear}</p>
                            </div>
                        </div>

                        {/* Service Summary */}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <p className="text-gray-500">Service Type</p>
                                <p className="font-medium">{maintenence.serviceType}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Cost</p>
                                <p className="font-medium">{maintenence.cost} лв.</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Mileage</p>
                                <p className="font-medium">{maintenence.km} km</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Date</p>
                                <p className="font-medium">{maintenence.date.split('T')[0]}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <p className="text-gray-500 text-sm mb-1">Description</p>
                            <div className="border rounded-md p-3 text-sm text-gray-800 bg-gray-50">
                                {maintenence.description || "No description provided."}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="text-xs text-gray-400 border-t pt-2 flex justify-between">
                            <span>Created: {maintenence.createdAt.split('T')[0]}</span>
                            <span>Updated: {maintenence.updatedAt.split('T')[0]}</span>
                        </div>
                    </div>
                </div>

            )}

        </>
    );
}