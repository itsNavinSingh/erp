import React, { useEffect, useState } from "react";
import {
  BasicDepartmentResponse,
  DepartmentData,
  GetDepartmentResponse,
} from "../../models/department";
import { useToastStore } from "../../store/toast";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";
import DepartmentElement from "../../components/departmentElement";
import { RefreshCcw } from "lucide-react";

type MasterDepartmentState = {
  masterData: DepartmentData[];
  showDepartment: DepartmentData[];
  tempDepartment: DepartmentData;
  editMode: boolean;
};
const DepartmentPage: React.FC = () => {
  const [states, setStates] = useState<MasterDepartmentState>({
    masterData: [],
    showDepartment: [],
    tempDepartment: { ID: 0, Name: "" },
    editMode: false,
  });
  const toast = useToastStore();

  const getDepartment: () => void = async () => {
    try {
      const response = await axios.get<
        GetDepartmentResponse,
        AxiosResponse<GetDepartmentResponse, ErrorResponse>
      >("/api/admin/department", { withCredentials: true });
      if (response.status == 200) {
        const data = response.data.Data;
        setStates((prev) => ({
          ...prev,
          masterData: data,
          showDepartment: [...data],
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

  const addDepartment: () => void = async () => {
    if (states.tempDepartment.Name === "") {
      return;
    }
    try {
      const response = await axios.post<
        BasicDepartmentResponse,
        AxiosResponse<BasicDepartmentResponse, ErrorResponse>
      >("/api/admin/department", states.tempDepartment, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const newdata = [...states.masterData, response.data.Data];
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showDepartment: [...newdata],
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
      setStates((prev) => ({ ...prev, tempDepartment: { ID: 0, Name: "" } }));
    }
  };

  const deleteDepartment: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((dept) => dept.ID === id);
    if (data) {
      try {
        const response = await axios.delete<
          BasicDepartmentResponse,
          AxiosResponse<BasicDepartmentResponse, ErrorResponse>
        >("/api/admin/department", {
          data,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.status === 200) {
          const newdata = states.masterData.filter(
            (dept) => dept.ID !== response.data.Data.ID
          );
          setStates((prev) => ({
            ...prev,
            masterData: newdata,
            showDepartment: [...newdata],
          }));
          toast.showToast(response.data.Msg, true);
        } else {
          toast.showToast(response.data.Msg, false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.showToast(
            error.response?.data?.Msg || "An Error Occured",
            false
          );
        } else {
          toast.showToast(String(error), false);
        }
      }
    }
  };

  const editDepartment: (id: number) => void = (id: number) => {
    const data = states.masterData.find((dept) => dept.ID === id);
    if (data) {
      setStates((prev) => ({ ...prev, editMode: true, tempDepartment: data }));
    }
  };
  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editMode: false,
      tempDepartment: { ID: 0, Name: "" },
    }));
  };
  const saveEditDepartment: () => void = async () => {
    if (states.tempDepartment.Name === "") {
      return;
    }
    try {
      const response = await axios.patch<
        BasicDepartmentResponse,
        AxiosResponse<BasicDepartmentResponse, ErrorResponse>
      >("/api/admin/department", states.tempDepartment, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const newdata = [
          ...states.masterData.filter(
            (dept) => dept.ID !== response.data.Data.ID
          ),
          response.data.Data,
        ];
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showDepartment: [...newdata],
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
        tempDepartment: { ID: 0, Name: "" },
      }));
    }
  };

  const filterDept: () => void = () => {
    const newdata = states.masterData.filter((dept) =>
      dept.Name.toLowerCase().includes(states.tempDepartment.Name.toLowerCase())
    );
    setStates((prev) => ({ ...prev, showDepartment: newdata }));
  };

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:flex-1">
          <input
            type="text"
            placeholder="Department"
            value={states.tempDepartment.Name}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempDepartment: {
                  ...prev.tempDepartment,
                  Name: e.target.value,
                },
              }));
            }}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
          />
        </div>
        <div className="flex w-full lg:w-auto lg:space-x-4">
          <button
            onClick={states.editMode ? cancleEdit : filterDept}
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
          <button
            onClick={states.editMode ? saveEditDepartment : addDepartment}
            className="p-2 bg-green-500 gover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer"
          >
            {states.editMode ? "Save" : "Add Dept"}
          </button>
          <button
            onClick={
              states.masterData.length === states.showDepartment.length
                ? getDepartment
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showDepartment: [...prev.masterData],
                      tempDepartment: { ID: 0, Name: "" },
                    }));
                  }
            }
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-evenly cursor-pointer"
          >
            <RefreshCcw className="" />{" "}
            <span className="">
              {states.masterData.length === states.showDepartment.length
                ? "Refresh"
                : "Clear"}
            </span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {states.showDepartment.map((dept) => (
          <DepartmentElement
            Data={dept}
            onDelete={deleteDepartment}
            onEdit={editDepartment}
          />
        ))}
      </div>
    </div>
  );
};
export default DepartmentPage;
