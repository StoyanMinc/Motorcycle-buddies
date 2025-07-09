interface ModalPros {
    closeModal: () => void,
    action: () => void,
    title: string,
    confirmButtonText: string
}
export default function ConfirmModal({
    closeModal,
    title,
    confirmButtonText,
    action
}: ModalPros) {
    return (
        <div
            onClick={closeModal}
            className="absolute flex flex-1 flex-col items-center justify-center w-full h-full bg-black/80">
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[30%] p-5 rounded-xl flex flex-col gap-4"
            >
                <h3 className="text-2xl self-center font-bold mb-5">{title}</h3>
                <div className="flex justify-around gap-5">
                    <button
                        onClick={closeModal}
                        className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out" >
                        Cancel
                    </button>
                    <button
                    onClick={action}
                        className="bg-red-400 w-full px-4 py-2 rounded-md text-white hover:bg-red-500 transition duration-500 ease-in-out" >
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}