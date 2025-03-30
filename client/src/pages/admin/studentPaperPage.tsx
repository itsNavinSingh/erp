import { useEffect, useState } from "react";
import {
  BasicStdPepResponse,
  defaultStdPep,
  GetStdPepResponse,
  StudentPaperData,
} from "../../models/studentPaper";
import { useToastStore } from "../../store/toast";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";
import StudentPaperElement from "../../components/studentPaperElement";
import { RefreshCcw } from "lucide-react";

type MasterStdPepState = {
  masterData: StudentPaperData[];
  showData: StudentPaperData[];
  tempData: StudentPaperData;
  editMode: boolean;
};
const StudentPaperPage: React.FC = () => {
  const [states, setStates] = useState<MasterStdPepState>({
    masterData: [],
    showData: [],
    tempData: defaultStdPep(),
    editMode: false,
  });

  const toast = useToastStore();

  const getStdPep: () => void = async () => {
    try {
      const response = await axios.get<
        GetStdPepResponse,
        AxiosResponse<GetStdPepResponse, ErrorResponse>
      >("/api/admin/studentPaper", { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showData: newdata,
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

  const addStdPep: () => void = async () => {
    if (states.tempData.PaperID === 0 || states.tempData.StudentID === 0) {
      return;
    }
    try {
      const response = await axios.post<
        BasicStdPepResponse,
        AxiosResponse<BasicStdPepResponse, ErrorResponse>
      >("/api/admin/studentPaper", states.tempData, { withCredentials: true });
      if (response.status === 200) {
        const newdata = [...states.masterData, response.data.Data];
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
    } finally {
      setStates((prev) => ({
        ...prev,
        tempData: defaultStdPep(),
      }));
    }
  };

  const editStdPep: (id: number) => void = (id: number) => {
    const data = states.masterData.find((stdpep) => stdpep.ID === id);
    if (data) {
      setStates((prev) => ({
        ...prev,
        editMode: true,
        tempData: data,
      }));
    }
  };

  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editMode: false,
      tempData: defaultStdPep(),
    }));
  };

  const saveEdit: () => void = async () => {
    if (
      states.tempData.ID === 0 ||
      states.tempData.PaperID === 0 ||
      states.tempData.StudentID === 0
    ) {
      return;
    }
    try {
      const response = await axios.patch<
        BasicStdPepResponse,
        AxiosResponse<BasicStdPepResponse, ErrorResponse>
      >("/api/admin/studentPaper", states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const newdata = [
          ...states.masterData.filter(
            (stdpep) => stdpep.ID !== response.data.Data.ID
          ),
          response.data.Data,
        ];
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
    } finally {
      setStates((prev) => ({
        ...prev,
        editMode: false,
        tempData: defaultStdPep(),
      }));
    }
  };

  const deleteStdPep: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((stdpep) => stdpep.ID === id);
    if (!data) {
      return;
    }
    try {
      const response = await axios.delete<
        BasicStdPepResponse,
        AxiosResponse<BasicStdPepResponse, ErrorResponse>
      >("/api/admin/studentPaper", {
        data,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const newdata = states.masterData.filter(
          (stdpep) => stdpep.ID !== response.data.Data.ID
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

  const filterStdPep: () => void = () => {
    let newdata = states.masterData;
    if (states.tempData.StudentID !== 0) {
      newdata = newdata.filter((stdpep) =>
        String(stdpep.StudentID).includes(String(states.tempData.StudentID))
      );
    }
    if (states.tempData.PaperID !== 0) {
      newdata = newdata.filter((stdpep) =>
        String(stdpep.PaperID).includes(String(states.tempData.PaperID))
      );
    }
    setStates((prev) => ({
      ...prev,
      showData: newdata,
    }));
  };

  useEffect(() => {
    getStdPep();
  }, []);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:flex-1/2 flex items-center justify-center space-x-2">
          <label>Student ID: </label>
          <input
            type="number"
            className="flex-1 p-2 rounded bg-gray-300 dark:bg-gray-700"
            value={states.tempData.StudentID}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: {
                  ...prev.tempData,
                  StudentID: Number(e.target.value),
                },
              }));
            }}
          />
        </div>
        <div className="w-full lg:flex-1/2 flex items-center justify-center space-x-2">
          <label>Paper ID: </label>
          <input
            type="number"
            className="flex-1 p-2 rounded bg-gray-300 dark:bg-gray-700"
            value={states.tempData.PaperID}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, PaperID: Number(e.target.value) },
              }));
            }}
          />
        </div>
        <div className="flex w-full lg:w-5/12 lg:space-x-4">
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
            onClick={states.editMode ? cancleEdit : filterStdPep}
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
          <button
            className="p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer"
            onClick={states.editMode ? saveEdit : addStdPep}
          >
            {states.editMode ? "Save Data" : "Add Data"}
          </button>
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-center cursor-pointer"
            onClick={
              states.masterData.length === states.showData.length
                ? getStdPep
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showData: prev.masterData,
                      tempData: defaultStdPep(),
                    }));
                  }
            }
          >
            <RefreshCcw />{" "}
            <span>
              {states.masterData.length === states.showData.length
                ? "Refresh"
                : "Clear"}
            </span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {states.showData.map((data) => (
          <StudentPaperElement
            Data={data}
            onEdit={editStdPep}
            onDelete={deleteStdPep}
          />
        ))}
      </div>
    </div>
  );
};
export default StudentPaperPage;
