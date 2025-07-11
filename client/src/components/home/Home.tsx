export default function Home() {
    return (
        // <div className="flex flex-1 flex-col items-center justify-center w-full h-[100%] bg-gray-200">
        //     <h1>Welcome to Motorcycle Buddies!</h1>
        // </div>
        <div
            className="flex flex-1 flex-col items-center justify-center w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/homeImage.jpg')` }}
        >
            <h1 className="text-white text-4xl font-bold drop-shadow-lg">Welcome to Motorcycle Buddies!</h1>
        </div>
    );
}