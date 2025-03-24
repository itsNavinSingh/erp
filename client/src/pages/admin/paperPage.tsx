import { useEffect, useState } from "react";
import { DepartmentData, GetDepartmentResponse } from "../../models/department";
import {
  BasicPaperResponse,
  defaultPaper,
  GetPaperResponse,
  PaperData,
} from "../../models/paper";
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
      const response = await axios.get<
        GetDepartmentResponse,
        AxiosResponse<GetDepartmentResponse, ErrorResponse>
      >("/api/admin/department", { withCredentials: true });
      if (response.status === 200) {
        setStates((prev) => ({ ...prev, uniqueDept: response.data.Data }));
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
      const response = await axios.get<
        GetPaperResponse,
        AxiosResponse<GetPaperResponse, ErrorResponse>
      >("/api/admin/paper", { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showData: [...newdata],
        }));
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

  const addPaper: () => void = async () => {
    if (
      states.tempData.Name === "" ||
      states.tempData.UPC === 0 ||
      states.tempData.Semister === 0 ||
      states.tempData.DepartmentID === 0 ||
      states.tempData.Type === ""
    ) {
      return;
    }
    try {
      const response = await axios.post<
        BasicPaperResponse,
        AxiosResponse<BasicPaperResponse, ErrorResponse>
      >("/api/admin/paper", states.tempData, { withCredentials: true });
      if (response.status === 200) {
        const newdata = [...states.masterData, response.data.Data];
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showData: newdata,
          tempData: defaultPaper(),
        }));
        toast.showToast(response.data.Msg, true);
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

  const deletePaper: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((pap) => pap.ID === id);
    if (!data) {
      return;
    }
    try {
      const response = await axios.delete<
        BasicPaperResponse,
        AxiosResponse<BasicPaperResponse, ErrorResponse>
      >("/api/admin/paper", {
        data,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const newdata = states.masterData.filter(
          (pep) => pep.ID !== response.data.Data.ID
        );
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showData: newdata,
        }));
        toast.showToast(response.data.Msg, true);
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

  const editPaper: (id: number) => void = (id: number) => {
    const data = states.masterData.find((pep) => pep.ID === id);
    if (!data) {
      return;
    }
    setStates((prev) => ({ ...prev, tempData: data, editModel: true }));
  };

  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editModel: false,
      tempData: defaultPaper(),
    }));
  };

  const saveEdit: () => void = () => async () => {
    try {
      const response = await axios.patch<
        BasicPaperResponse,
        AxiosResponse<BasicPaperResponse, ErrorResponse>
      >("/api/admin/paper", states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const newdata = [...states.masterData.filter((pep) => pep.ID !== response.data.Data.ID), response.data.Data];
        setStates((prev) => ({...prev, masterData: newdata, showData: newdata}));
        toast.showToast(response.data.Msg, true);
      } else {
        toast.showToast(response.data.Msg, false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.showToast(error.response?.data?.Msg || "An Error Occured", false);
      } else {
        toast.showToast(String(error), false);
      }
    } finally {
        setStates((prev) => ({...prev, editModel: false, tempData: defaultPaper()}));
    }
  };

  const filterPaper: () => void = () => {
    // name
    // upc
    // semister
    // departmentid
    // type
    // credit l/t/p
  };
  useEffect(() => {
    getDept();
    getPaper();
  }, []);
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      // todo
    </div>
  );
};
export default PaperPage;
