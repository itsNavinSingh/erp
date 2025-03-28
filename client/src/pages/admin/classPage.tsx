import { useEffect, useState } from "react";
import {
  BasicClassResponse,
  ClassData,
  defaultClass,
  GetClassResponse,
} from "../../models/class";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";
import { useToastStore } from "../../store/toast";
import ClassElement from "../../components/classElement";
import { RefreshCcw } from "lucide-react";

type MasterClassState = {
  masterData: ClassData[];
  showData: ClassData[];
  tempData: ClassData;
  editMode: boolean;
};
const ClassPage: React.FC = () => {
  const [states, setStates] = useState<MasterClassState>({
    masterData: [],
    showData: [],
    tempData: defaultClass(),
    editMode: false,
  });
  const toast = useToastStore();

  const getClass: () => void = async () => {
    try {
      const response = await axios.get<
        GetClassResponse,
        AxiosResponse<GetClassResponse, ErrorResponse>
      >("/api/admin/class", { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        console.log(newdata);
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
        toast.showToast(error.response?.data?.Msg || "An Error occured", false);
      } else {
        toast.showToast(String(error), false);
      }
    }
  };

  const addClass: () => void = async () => {
    if (
      states.tempData.PaperID === 0 ||
      states.tempData.TeacherID === 0 ||
      states.tempData.Type === ""
    ) {
      return;
    }
    try {
      const response = await axios.post<
        BasicClassResponse,
        AxiosResponse<BasicClassResponse, ErrorResponse>
      >("/api/admin/class", states.tempData, { withCredentials: true });
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
      setStates((prev) => ({ ...prev, tempData: defaultClass() }));
    }
  };

  const editClass: (id: number) => void = (id: number) => {
    const data = states.masterData.find((cls) => cls.ID === id);
    if (data) {
      setStates((prev) => ({ ...prev, tempData: data, editMode: true }));
    }
  };

  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      tempData: defaultClass(),
      editMode: false,
    }));
  };

  const saveEdit: () => void = async () => {
    if (states.tempData.ID === 0) {
      return;
    }
    try {
      const response = await axios.patch<
        BasicClassResponse,
        AxiosResponse<BasicClassResponse, ErrorResponse>
      >("/api/admin/class", states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const newdata = [
          ...states.masterData.filter(
            (pep) => pep.ID !== response.data.Data.ID
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
        tempData: defaultClass(),
        editMode: false,
      }));
    }
  };

  const deleteClass: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((pep) => pep.ID === id);
    if (!data) {
      return;
    }
    try {
      const response = await axios.delete<
        BasicClassResponse,
        AxiosResponse<BasicClassResponse, ErrorResponse>
      >("/api/admin/class", {
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

  const filterClass: () => void = () => {
    let newdata = states.masterData;
    if (states.tempData.PaperID !== 0) {
      newdata = newdata.filter((pep) =>
        String(pep.PaperID).includes(String(states.tempData.PaperID))
      );
    }
    if (states.tempData.TeacherID !== 0) {
      newdata = newdata.filter((pep) =>
        String(pep.TeacherID).includes(String(states.tempData.TeacherID))
      );
    }
    setStates((prev) => ({ ...prev, showData: newdata }));
  };

  useEffect(() => {
    getClass();
  }, []);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:flex-1/2">
          <input
            type="number"
            placeholder="Paper ID"
            value={states.tempData.PaperID}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, PaperID: Number(e.target.value) },
              }));
            }}
          />
        </div>
        <div className="w-full lg:flex-1/2">
          <input
            type="number"
            placeholder="Teacher ID"
            value={states.tempData.TeacherID}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: {
                  ...prev.tempData,
                  TeacherID: Number(e.target.value),
                },
              }));
            }}
          />
        </div>
        <div className="flex w-full lg:w-5/12 lg:space-x-4">
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
            onClick={states.editMode ? cancleEdit : filterClass}
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
          <button
            className="p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer"
            onClick={states.editMode ? saveEdit : addClass}
          >
            {states.editMode ? "Save" : "Add Class"}
          </button>
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-center cursor-pointer"
            onClick={
              states.masterData.length === states.showData.length
                ? getClass
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showData: { ...prev.masterData },
                      tempData: defaultClass(),
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
          <ClassElement data={data} onDelete={deleteClass} onEdit={editClass} />
        ))}
      </div>
    </div>
  );
};
export default ClassPage;
