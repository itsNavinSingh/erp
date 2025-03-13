import { PacmanLoader } from "react-spinners";

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <div className="items-center">
                <PacmanLoader />
                <p className="text-xl font-semibold text-center">Loading...</p>
            </div>
        </div>
    );
}
export default LoadingScreen;