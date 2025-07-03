import { useState } from "react";
import { useGetAllMotorcycles } from "../../hooks/useMotorcycles";
import ImageModal from "../image-modal/ImageModal";

export default function Motorcycles() {
    const motorcycles = useGetAllMotorcycles();
    const [selectImage, setSelectedImage] = useState<string | null>(null);
    console.log(motorcycles);
    return (
        <div className="flex flex-1 p-4 gap-3 flex-wrap justify-center w-full bg-gray-200">
            {selectImage && <ImageModal image={selectImage}  onClose={() => setSelectedImage(null)} />}
            {motorcycles.map((motorcycle) => (
                <div
                    key={String(motorcycle._id)}
                    className="border flex flex-col flex-wrap  gap-2 w-[300px] h-[450px] p-2 rounded-md">
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
                </div>
            ))}
        </div>
    );
}