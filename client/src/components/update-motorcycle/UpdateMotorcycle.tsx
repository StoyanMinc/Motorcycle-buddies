import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useGetMotorcycle, useUpdateMotorcycle } from "../../hooks/useMotorcycles";
import type { CreateMotorcycleType } from "../../../types/motorcycle";
import { useParams } from "react-router-dom";

export default function UpdateMotorcycle() {
    const { motorcycleId } = useParams();
    const motorcycle = useGetMotorcycle(motorcycleId!);

    const { loading } = useUserContext();
    const [formData, setFormData] = useState<CreateMotorcycleType>({
        manufacturer: '',
        model: '',
        description: '',
        year: '',
        boughtYear: '',
        soldYear: '',
        image: null,
        type: ''
    });
    useEffect(() => {
        if (motorcycle) {
            setFormData({
                manufacturer: motorcycle.manufacturer,
                model: motorcycle.model,
                description: motorcycle.description,
                year: motorcycle.year,
                boughtYear: motorcycle.boughtYear,
                soldYear: motorcycle.soldYear,
                image: motorcycle.image,
                type: motorcycle.type
            });
        }
    }, [motorcycle]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!formData) return;

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        } as CreateMotorcycleType));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (!formData) return;

            const selectedFile = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                image: selectedFile,
            } as CreateMotorcycleType));
        }
    };
    const updateMotorcycle = useUpdateMotorcycle();
    const updateMotorcycleHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (motorcycleId && formData) {
            const response = await updateMotorcycle(motorcycleId, formData);
            if (response) return
        }
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/homeImage.jpg')` }}>
            <form
                onSubmit={updateMotorcycleHandler}
                className="bg-white/80 w-[30%] p-5 rounded-xl flex flex-col gap-1"
            >
                <h3 className="text-3xl self-center font-bold">Update Motorcycle</h3>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="type">Choose Type</label>
                    <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border-1 border-gray-400 rounded-md px-4 py-2">
                        <option value="motorcycle">Motorcycle</option>
                        <option value="car">Car</option>
                    </select>
                </div>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        value={formData?.manufacturer}
                        onChange={handleChange}
                    />
                </div>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="model">Model</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                    />
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="year">Year</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="boughtYear">Bought year</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                        type="text"
                        id="boughtYear"
                        value={formData.boughtYear}
                        name="boughtYear"
                        onChange={handleChange}
                    />
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="soldYear">Sold year</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                        placeholder="only if you are sold bike already"
                        type="text"
                        id="soldYear"
                        value={formData.soldYear}
                        name="soldYear"
                        onChange={handleChange}
                    />
                </div>

                <div className="relative flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="border-1 border-gray-400 rounded-md px-4 py-2 relative"
                        rows={3}
                        cols={30}
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="relative flex flex-col">
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border border-gray-400 rounded-md px-4 py-2"
                    />
                </div>
                <button
                    className="bg-blue-400 w-full px-4 py-2 mt-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out"
                    disabled={loading ? true : false}
                >
                    {loading ? 'Wait...' : 'Update'}
                </button>
            </form>
        </div>
    );
}