import { useEffect, useState } from "react";
import { DepartmentData, GetDepartmentResponse } from "../../models/department";
import {
  BasicTeacherResponse,
  defaultTeacher,
  GetTeacherResponse,
  TeacherData,
} from "../../models/teacher";
import axios, { AxiosResponse } from "axios";
import { useToastStore } from "../../store/toast";
import { ErrorResponse } from "../../models/error";
import TeacherElement from "../../components/teacherElement";
import { RefreshCcw } from "lucide-react";

type MasterTeacherState = {
  masterData: TeacherData[];
  showData: TeacherData[];
  tempData: TeacherData;
  editMode: boolean;
  uniqueDept: DepartmentData[];
};
const TeacherPage: React.FC = () => {
  const [states, setStates] = useState<MasterTeacherState>({
    masterData: [],
    showData: [],
    tempData: defaultTeacher(),
    editMode: false,
    uniqueDept: [],
  });

  const toast = useToastStore();

  const getTeacher: () => void = async () => {
    try {
      const response = await axios.get<
        GetTeacherResponse,
        AxiosResponse<GetTeacherResponse, ErrorResponse>
      >("/api/admin/teacher", { withCredentials: true });
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

  const getDept: () => void = async () => {
    try {
      const response = await axios.get<
        GetDepartmentResponse,
        AxiosResponse<GetDepartmentResponse, ErrorResponse>
      >("/api/admin/department", { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        setStates((prev) => ({ ...prev, uniqueDept: newdata }));
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

  const addTeacher: () => void = async () => {
    if (
      states.tempData.UserID === 0 ||
      states.tempData.Prefix === "" ||
      states.tempData.Phone === 0 ||
      states.tempData.DepartmentID === 0
    ) {
      return;
    }
    try {
      const response = await axios.post<
        BasicTeacherResponse,
        AxiosResponse<BasicTeacherResponse, ErrorResponse>
      >("/api/admin/teacher", states.tempData, { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        setStates((prev) => ({
          ...prev,
          masterData: [...prev.masterData, newdata],
          showData: [...prev.showData, newdata],
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
      setStates((prev) => ({ ...prev, tempData: defaultTeacher() }));
    }
  };

  const setEdit: (id: number) => void = (id: number) => {
    const data = states.masterData.find((ths) => ths.ID === id);
    if (data) {
      setStates((prev) => ({ ...prev, tempData: data, editMode: true }));
    }
  };

  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editMode: false,
      tempData: defaultTeacher(),
    }));
  };

  const saveEdit: () => void = async () => {
    if (states.tempData.ID !== 0) {
      try {
        const response = await axios.patch<
          BasicTeacherResponse,
          AxiosResponse<BasicTeacherResponse, ErrorResponse>
        >("/api/admin/teacher", states.tempData, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const data = [
            ...states.masterData.filter(
              (elem) => elem.ID !== response.data.Data.ID
            ),
            response.data.Data,
          ];
          setStates((prev) => ({
            ...prev,
            masterData: data,
            showData: [...data],
            editMode: false,
            tempData: defaultTeacher(),
          }));
          toast.showToast(response.data.Msg, true);
        } else {
          toast.showToast(response.data.Msg, false);
          setStates((prev) => ({
            ...prev,
            editMode: false,
            tempData: defaultTeacher(),
          }));
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
        setStates((prev) => ({
          ...prev,
          editMode: false,
          tempData: defaultTeacher(),
        }));
      }
    }
  };

  const deleteTecher: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((elem) => elem.ID === id);
    if (data) {
      try {
        const response = await axios.delete<
          BasicTeacherResponse,
          AxiosResponse<BasicTeacherResponse, ErrorResponse>
        >("/api/admin/teacher", {
          data,
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const newdata = states.masterData.filter(
            (elem) => elem.ID !== response.data.Data.ID
          );
          setStates((prev) => ({
            ...prev,
            masterData: newdata,
            showData: [...newdata],
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

  const filterTeacher: () => void = () => {
    let newdata = states.masterData;
    if (states.tempData.UserID !== 0) {
      newdata = newdata.filter(
        (elem) => elem.UserID === states.tempData.UserID
      );
    }
    if (states.tempData.Prefix !== "") {
      newdata = newdata.filter((elem) =>
        elem.Prefix.toLowerCase().includes(states.tempData.Prefix.toLowerCase())
      );
    }
    if (states.tempData.Phone !== 0) {
      newdata = newdata.filter((elem) =>
        String(elem.Phone).includes(String(states.tempData.Phone))
      );
    }
    if (states.tempData.DepartmentID !== 0) {
      newdata = newdata.filter(
        (elem) => elem.DepartmentID === states.tempData.DepartmentID
      );
    }
    setStates((prev) => ({ ...prev, showData: newdata }));
  };

  useEffect(() => {
    getDept();
    getTeacher();
  }, []);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:w-1/12">
          <input
            type="number"
            placeholder="User ID"
            value={states.tempData.UserID}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, UserID: Number(e.target.value) },
              }));
            }}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
          />
        </div>
        <div className="w-full lg:w-1/12">
            <input
              type="text"
              placeholder="Prefix"
              value={states.tempData.Prefix}
              onChange={(e)=>{
                setStates((prev)=>({...prev, tempData: {...prev.tempData, Prefix: e.target.value}}));
              }}
              className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="w-full lg:w-1/6">
              <input
                type="number"
                placeholder="Phone"
                value={states.tempData.Phone}
                onChange={(e)=>{
                  setStates((prev)=>({...prev, tempData: {...prev.tempData, Phone: Number(e.target.value)}}));
                }}
                className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
              />
        </div>
        <div className="w-full lg:flex-1">
        <select
          name="department"
          id="department"
          className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
          value={states.tempData.DepartmentID}
          onChange={(e)=>{
            const data = states.uniqueDept.find((elem)=>elem.ID===Number(e.target.value));
            if (data){
              setStates((prev)=>({...prev, tempData: {...prev.tempData, Department: data.Name, DepartmentID: data.ID}}));
            }
          }}
        >
          <option value={0}>Select Department</option>
          {states.uniqueDept.map((elem)=>(
            <option value={elem.ID}>{elem.Name}</option>
          ))}
        </select>
        </div>
        <div className="w-full flex lg:flex-1 lg:space-x-4">
          <button
            className="px-4 p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
            onClick={states.editMode ? cancleEdit : filterTeacher}
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
          <button
            className="px-4 p-2 bg-green-500 hover:bg-green-600 dark:bg-green-400 rounded cursor-pointer"
            onClick={states.editMode ? saveEdit : addTeacher}
          >
            {states.editMode ? "Save" : "Add"}
          </button>
          <button
            className="px-4 p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-evenly cursor-pointer"
            onClick={
              states.masterData.length === states.showData.length
                ? getTeacher
                : () => {
                  setStates((prev)=>({...prev, showData: [...prev.masterData], tempData: defaultTeacher()}));
                } 
            }
          >
            <RefreshCcw />
            <p className="px-2">
              {states.masterData.length === states.showData.length
                ? "Refresh"
                : "Clear"
              }
            </p>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {states.showData.map((data) => (
          <TeacherElement
            Data={data}
            onEdit={setEdit}
            onDelete={deleteTecher}
          />
        ))}
      </div>
    </div>
  );
};
export default TeacherPage;
