import { useState } from "react";
import { useDeleteMotorcycle, useGetAllMotorcycles } from "../../hooks/useMotorcycles";
import ImageModal from "../image-modal/ImageModal";
import { Link } from "react-router-dom";
import ConfirmModal from "../confirm-modal/ComfirmModal";

export default function Motorcycles() {
    const { motorcycles, refetch } = useGetAllMotorcycles();
    const [showConfirmModal, setShowConfrimModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);


    const deleteMotorycle = useDeleteMotorcycle();
    const [selectImage, setSelectedImage] = useState<string | null>(null);
    const deleteMotorcycleHandlder = async () => {
        if (!selectedId) return
        await deleteMotorycle(selectedId);
        await refetch();
        closeModal();
    }
    const closeModal = () => {
        setShowConfrimModal(false);
    }
    return (
        <div className="flex flex-1 flex-col flex-wrap justify-center w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/homeImage.jpg')` }}>
            <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800">My Motorcycles Over The Years</h1>
            </div>
            {showConfirmModal &&
                <ConfirmModal
                    closeModal={closeModal}
                    title='Are you sure you want delete this Bike?'
                    confirmButtonText="Delete"
                    action={deleteMotorcycleHandlder}

                />}
            <div className="flex flex-1 p-4 gap-3 flex-wrap justify-center">
                {selectImage && <ImageModal image={selectImage} onClose={() => setSelectedImage(null)} />}
                {motorcycles.length > 0 ? (

                    motorcycles.map((motorcycle) => (
                        <div
                            key={String(motorcycle._id)}
                            className="border flex flex-col flex-wrap gap-1 w-[300px] h-[460px] p-2 rounded-md bg-white/80">
                            <img
                                onClick={() => setSelectedImage(motorcycle.image)}
                                src={motorcycle.image} alt="motorcycle" className="w-full h-48 object-cover rounded-md shadow-sm" />
                            <p>Manufacturer: <span className="break-all font-bold">{motorcycle.manufacturer}</span></p>
                            <p>Model: <span className="font-bold">{motorcycle.model}</span></p>
                            <p>Year: <span className="font-bold">{motorcycle.year}</span></p>
                            <p>Sold: <span className="font-bold">{motorcycle.soldYear}</span></p>
                            <p>Description: <span className="font-bold">{motorcycle.description}</span></p>
                            <p>Added at: <span className="font-bold">{motorcycle.createdAt.split('T')[0]}</span></p>
                            <p>Owner: <span className="font-bold">{motorcycle.owner.username}</span></p>
                            <div className="flex justify-around mt-2">
                                <Link to={`/motorcycles/update/${motorcycle._id}`} className="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-600 text-white">update</Link>
                                <button
                                    onClick={() => {
                                        setSelectedId(motorcycle._id);
                                        setShowConfrimModal(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white"
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <h3>There is no added motorcycles</h3>
                        <Link to={'/motorcycles/add'} className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">Add Bike</Link>
                    </div>
                )}
            </div>
        </div>
    );
}