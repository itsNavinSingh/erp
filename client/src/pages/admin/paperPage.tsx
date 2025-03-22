import { useState } from "react";
import { DepartmentData, GetDepartmentResponse } from "../../models/department";
import { defaultPaper, GetPaperResponse, PaperData } from "../../models/paper";
import { useToastStore } from "../../store/toast";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";

type MasterPaperState = {
  masterData: PaperData[];
  showData: PaperData[];
  uniqueDept: DepartmentData[];
  tempData: PaperData;
  editModel: boolean;
};
const PaperPage: React.FC = () => {
  const [states, setStates] = useState<MasterPaperState>({
    masterData: [],
    showData: [],
    uniqueDept: [],
    tempData: defaultPaper(),
    editModel: false,
  });
  const toast = useToastStore();

  const getDept: () => void = async () => {
    try {
        const response = await axios.get<GetDepartmentResponse, AxiosResponse<GetDepartmentResponse, ErrorResponse>>("/api/admin/department", {withCredentials: true});
        if (response.status === 200) {
            setStates((prev) => ({...prev, uniqueDept: response.data.Data}));
        } else {
            toast.showToast(response.data.Msg, false);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.showToast(error.response?.data?.Msg || "An Error Occured", false);
        } else {
            toast.showToast(String(error), false);
        }
    }
  };

  const getPaper: () => void = async () => {
    try {
        const response = await axios.get<GetPaperResponse, AxiosResponse<GetPaperResponse, ErrorResponse>>("/api/admin/paper", {withCredentials: true});
        if (response.status === 200) {
            const newdata = response.data.Data;
            setStates((prev) => ({...prev, masterData: newdata, showData: [...newdata]}));
        } else {
            toast.showToast(response.data.Msg, false);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.showToast(error.response?.data?.Msg||"An Error Occured", false);
        } else {
            toast.showToast(String(error), false);
        }
    }
  };
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
        // todo
    </div>
  );
};
export default PaperPage;
