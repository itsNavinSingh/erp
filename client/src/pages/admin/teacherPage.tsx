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

  // to do filter function
  //   UserRoundIcon, prefix, phone, department

  useEffect(() => {
    getDept();
    getTeacher();
  }, []);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
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
