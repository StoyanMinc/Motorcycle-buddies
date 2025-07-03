type ImageModalProps = {
    image: string;
    onClose: () => void;
};

export default function ImageModal({ image, onClose }: ImageModalProps) {
    return (

        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <img
                onClick={(e) => e.stopPropagation()}
                src={image} alt="motorycle"
                className="max-w-3xl max-h-[90vh] rounded-lg shadow-xl"
            />
        </div>
    );
}