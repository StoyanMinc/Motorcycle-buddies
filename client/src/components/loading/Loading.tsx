export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                <p className="text-white text-lg font-medium tracking-wide animate-pulse">Please wait...</p>
            </div>
        </div>
    );
}
