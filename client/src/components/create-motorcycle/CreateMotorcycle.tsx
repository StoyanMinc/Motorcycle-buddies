import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useCreateMotorycle } from "../../hooks/useMotorcycles";
import type { CreateMotorcycleType } from "../../../types/motorcycle";

export default function CreateMotorcycle() {

    const { loading } = useUserContext();
    const [formData, setFormData] = useState<CreateMotorcycleType>({
        manufacturer: '',
        model: '',
        description: '',
        year: '',
        boughtYear: '',
        soldYear: '',
        image: null
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                image: selectedFile,
            }));
        }
    };
    const createMotorcycle = useCreateMotorycle();
    const createMotorcycleHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await createMotorcycle(formData);
        if (response) return
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
            <form
                onSubmit={createMotorcycleHandler}
                className="bg-white w-[30%] p-5 rounded-xl flex flex-col gap-1"
            >
                <h3 className="text-3xl self-center font-bold">Post Motorcycle</h3>
                <div className="relative flex flex-col gap-1">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-2"
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
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
                    {loading ? 'Wait...' : 'Post'}
                </button>
            </form>
        </div>
    );
}