import { useGetCurrentMotorcycles } from "../../hooks/useMotorcycles";

interface AddModalProps {
    closeModal: () => void
}
export default function AddMaintenance({
    closeModal
}: AddModalProps) {
    const motorcycles = useGetCurrentMotorcycles();

    return (
        <div
            onClick={closeModal}
            className="absolute flex flex-1 flex-col items-center justify-center w-full h-full bg-black/80">
            <form
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[30%] p-5 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-4xl self-center font-bold">Add service</h3>
                <div className="flex flex-col">
                    <label htmlFor="motorcycle">Choose motorcycle</label>
                    <select name="motorcycle" id="motorcycle" className="border-1 border-gray-400 rounded-md px-4 py-1 mt-1">
                        {motorcycles.map((motorcycle) => (
                            <option value={motorcycle._id}>{`${motorcycle.manufacturer} ${motorcycle.model}`}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="serviceType">Service type</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-1"
                        type="text"
                        id="serviceType"
                        name="serviceType"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea className="border rounded-md" rows={3}
                        cols={20} name="description" id="description"></textarea>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="cost">Cost</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-1"
                        type="number"
                        id="cost"
                        name="cost"
                    />
                    <span className="absolute top-8 right-10">$</span>
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="km">Kilometers</label>
                    <input
                        className="border-1 border-gray-400 rounded-md px-4 py-1"
                        type="number"
                        id="km"
                        name="km"
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
                    />
                </div>
                <button
                    className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" >
                    Add service
                </button>
            </form>
        </div>
    );
}