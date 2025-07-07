import { useState } from "react";
import { useDeleteMotorcycle, useGetAllMotorcycles } from "../../hooks/useMotorcycles";
import ImageModal from "../image-modal/ImageModal";
import { Link } from "react-router-dom";

export default function Motorcycles() {
    const { motorcycles, refetch } = useGetAllMotorcycles();
    const deleteMotorycle = useDeleteMotorcycle();
    const [selectImage, setSelectedImage] = useState<string | null>(null);
    const deleteMotorycleHandler = async (id: string) => {
        const response = await deleteMotorycle(id)
        if (!response) return
        await refetch();
    }
    return (
        <div className="flex flex-1 flex-wrap justify-center w-full bg-gray-200">
            <div className="flex flex-1 p-4 gap-3 flex-wrap justify-center">
                {selectImage && <ImageModal image={selectImage} onClose={() => setSelectedImage(null)} />}
                {motorcycles.length > 0 ? (

                    motorcycles.map((motorcycle) => (
                        <div
                            key={String(motorcycle._id)}
                            className="border flex flex-col flex-wrap gap-1 w-[300px] h-[460px] p-2 rounded-md">
                            <img
                                onClick={() => setSelectedImage(motorcycle.image)}
                                src={motorcycle.image} alt="motorcycle" className="w-full h-48 object-cover rounded-md shadow-sm" />
                            <p>Manufacturer: <span className="break-all">{motorcycle.manufacturer}</span></p>
                            <p>Model: <span>{motorcycle.model}</span></p>
                            <p>Year: <span>{motorcycle.year}</span></p>
                            <p>Sold: <span>{motorcycle.soldYear}</span></p>
                            <p>Description: <span>{motorcycle.description}</span></p>
                            <p>Posted at: <span>{motorcycle.createdAt.split('T')[0]}</span></p>
                            <p>Owner: <span>{motorcycle.owner.username}</span></p>
                            <div className="flex justify-around mt-2">
                                <Link to={`/motorcycles/update/${motorcycle._id}`} className="px-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white">update</Link>
                                <button
                                    onClick={() => deleteMotorycleHandler(motorcycle._id)}
                                    className="bg-red-500 px-2 rounded-md hover:bg-red-600 text-white">delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <h3>There is no added motorcycles</h3>
                        <Link to={'/motorcycles/add'} className="bg-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-white">Post Bike</Link>
                    </div>
                )}
            </div>
        </div>
    );
}