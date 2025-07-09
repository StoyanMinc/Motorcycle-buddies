import { useGetCurrentMotorcycles } from "../../hooks/useMotorcycles";
import type { AddModalProps, CreateMaintenance } from '../../../types/maintenance'
import { useCreateMaintenance, useUpdateMaintenance } from "../../hooks/useMaintenance";
import { useState } from "react";

export default function AddMaintenance({
    closeModal,
    refetch,
    editData
}: AddModalProps) {

    let motorcycles;
    if(!editData) {
         motorcycles = useGetCurrentMotorcycles();
    }
    const [formData, setFormData] = useState<CreateMaintenance>({
        motorcycleId: editData?.motorcycleId || '',
        serviceType: editData?.serviceType || '',
        description: editData?.description || '',
        cost: editData?.cost || 0,
        km: editData?.km || 0,
        date: editData ? new Date(editData.date).toISOString().split('T')[0] : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const createMentanance = useCreateMaintenance();
    const updateMaintenance = useUpdateMaintenance()
    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if(editData) {
            await updateMaintenance(editData._id, formData);
        } else {
            await createMentanance(formData);

        }
        closeModal();
        await refetch();
    }
    return (
        <div
            onClick={closeModal}
            className="absolute flex flex-1 flex-col items-center justify-center w-full h-full bg-black/80">
            <form
                onSubmit={submitHandler}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[30%] p-5 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-4xl self-center font-bold">{editData ? 'Edit service' : 'Add service'}</h3>
                <div className="flex flex-col">
                    <label htmlFor="motorcycleId">Choose motorcycle</label>
                    {!editData && motorcycles && 
                        <select
                            name="motorcycleId"
                            id="motorcycleId"
                            className="border-1 border-gray-400 rounded-md px-4 py-1 mt-1"
                            onChange={handleChange}
                        >
                            <option value="">-</option>
                            {motorcycles.map((motorcycle) => (
                                <option
                                    key={motorcycle._id}
                                    value={motorcycle._id}>{`${motorcycle.manufacturer} ${motorcycle.model}`}</option>
                            ))}
                        </select>
                    }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="serviceType">Service type</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-1"
                        type="text"
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea className="border rounded-md px-2" rows={3}
                        cols={20} name="description" id="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="cost">Cost</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-2 py-1"
                        type="number"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                    />
                    <span className="absolute top-8 right-10">$</span>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="km">Kilometers</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-2 py-1"
                        type="number"
                        id="km"
                        name="km"
                        value={formData.km}
                        onChange={handleChange}
                    />
                    <span className="absolute top-8 right-10">km</span>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="date">Date</label>
                    <input
                        className="px-4 py-1 border rounded-md"
                        type="date"
                        id="date"
                        name="date"
                        placeholder="select date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" >
                    {editData ? "Update service" : "Add service"}
                </button>
            </form>
        </div>
    );
}