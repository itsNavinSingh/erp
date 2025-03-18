import React, { useEffect, useState } from "react";
import { BasicDepartmentResponse, DepartmentData, GetDepartmentResponse } from "../../models/department";
import { useToastStore } from "../../store/toast";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";

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
    if (states.tempDepartment.Name === ""){
        return;
    }
    try {
        const response = await axios.post<BasicDepartmentResponse, AxiosResponse<BasicDepartmentResponse, ErrorResponse>>("/api/admin/department", states.tempDepartment, {withCredentials: true});
        if (response.status === 200) {
            const newdata = [...states.masterData, response.data.Data];
            setStates((prev) => ({...prev, masterData: newdata, showDepartment: [...newdata]}));
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
        setStates((prev)=>({...prev, tempDepartment: {ID: 0, Name: ""}}));
    }
  };

  const deleteDepartment: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((dept) => dept.ID === id);
    if (data) {
        try {
            const response = await axios.delete<BasicDepartmentResponse, AxiosResponse<BasicDepartmentResponse, ErrorResponse>>("/api/admin/department", {
                data,
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            });
            if (response.status === 200) {
                const newdata = states.masterData.filter((dept) => dept.ID !== response.data.Data.ID);
                setStates((prev)=> ({...prev, masterData: newdata, showDepartment: [...newdata]}));
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
    }
  };

  const editDepartment: (id: number) => void = (id: number) => {
    const data = states.masterData.find((dept) => dept.ID === id);
    if(data) {
        setStates((prev) => ({...prev, editMode: true, tempDepartment: data}));
    }
  };
  const saveEditDepartment: () => void = async () => {
    if (states.tempDepartment.Name === ""){
        return;
    }
    try {
        const response = await axios.patch<BasicDepartmentResponse, AxiosResponse<BasicDepartmentResponse, ErrorResponse>>("/api/admin/department", states.tempDepartment, {withCredentials: true, headers: {"Content-Type": "application/json"}});
        if (response.status === 200) {
            const newdata = [...states.masterData.filter((dept) => dept.ID !== response.data.Data.ID), response.data.Data];
            setStates((prev) => ({...prev, masterData: newdata, showDepartment: [...newdata]}));
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
        setStates((prev) => ({...prev, editMode: false, tempDepartment: {ID: 0, Name: ""}}));
    }
  };

  const filterDept: () => void = () => {
    const newdata = states.masterData.filter((dept) => {dept.Name.includes(states.tempDepartment.Name)});
    setStates((prev)=> ({...prev, showDepartment: newdata}));
  };

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="text-black dark:text-white transition-all">
      <ul>
        {states.showDepartment.map((dept) => (
          <li key={dept.ID}>{dept.ID}. {dept.Name}</li>
        ))}
      </ul>
    </div>
  );
};
export default DepartmentPage;
