import { CircleCheckBig, CircleX, X } from "lucide-react";
import { useToastStore } from "../store/toast";

interface EachToastprop {
  id: number;
  message: string;
  success: boolean;
}
const EachToast: React.FC<EachToastprop> = ({
  id,
  message,
  success,
}: EachToastprop) => {
  const toast = useToastStore();
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-md ${
        success ? "bg-green-500 text-black" : "bg-red-500 text-white"
      } opacity-75`}
    >
      {success ? <CircleCheckBig /> : <CircleX />}
      <span className="mx-1 font-medium text-lg">{message}</span>
      <button
        onClick={() => toast.removeToast(id)}
        className="ml-2 text-white focus:outline-none cursor-pointer"
      >
        <X color={success? "black" : "white"}/>
      </button>
    </div>
  );
};

const CustomToast: React.FC = () => {
  const toasts = useToastStore();
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      {toasts.toasts.map((data) => <EachToast id={data.id} message={data.message} success={data.success} />)}
    </div>
  );
};
export default CustomToast;
