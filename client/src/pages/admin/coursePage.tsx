import { useEffect, useState } from "react";
import {
  BasicCourseResponse,
  CourseData,
  GetCourseResponse,
} from "../../models/course";
import axios, { AxiosResponse } from "axios";
import { ErrorResponse } from "../../models/error";
import { useToastStore } from "../../store/toast";
import { DepartmentData, GetDepartmentResponse } from "../../models/department";
import CourseElement from "../../components/courseElement";
import { RefreshCcw } from "lucide-react";
import { AdminAPI } from "../../constants/apiroute";

type MasterCourseState = {
  masterData: CourseData[];
  showData: CourseData[];
  uniqueDept: DepartmentData[];
  tempData: CourseData;
  editMode: boolean;
};
const CoursePage: React.FC = () => {
  const [states, setStates] = useState<MasterCourseState>({
    masterData: [],
    showData: [],
    uniqueDept: [],
    tempData: { ID: 0, Name: "", DepartmentID: 0, Department: "" },
    editMode: false,
  });
  const toast = useToastStore();

  const getDept: () => void = async () => {
    try {
      const response = await axios.get<
        GetDepartmentResponse,
        AxiosResponse<GetDepartmentResponse, ErrorResponse>
      >(AdminAPI.Department);
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

  const getCourse: () => void = async () => {
    try {
      const response = await axios.get<
        GetCourseResponse,
        AxiosResponse<GetCourseResponse, ErrorResponse>
      >(AdminAPI.Course, {
        withCredentials: true,
      });
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

  const addCourse: () => void = async () => {
    if (states.tempData.Name === "" || states.tempData.DepartmentID === 0) {
      return;
    }
    try {
      const response = await axios.post<
        BasicCourseResponse,
        AxiosResponse<BasicCourseResponse, ErrorResponse>
      >(AdminAPI.Course, states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        // to do
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

  const editCourse: (id: number) => void = (id: number) => {
    const data = states.masterData.find((course) => course.ID === id);
    if (data) {
      setStates((prev) => ({ ...prev, editMode: true, tempData: data }));
    }
  };

  const cancleEdit: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editMode: false,
      tempData: { ID: 0, Name: "", DepartmentID: 0, Department: "" },
    }));
  };

  const saveEdit: () => void = async () => {
    if (states.tempData.ID === 0) {
      return;
    }
    try {
      const response = await axios.patch<
        BasicCourseResponse,
        AxiosResponse<BasicCourseResponse, ErrorResponse>
      >(AdminAPI.Course, states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const newdata = states.masterData.filter(
          (course) => course.ID !== response.data.Data.ID
        );
        setStates((prev) => ({
          ...prev,
          masterData: [...newdata, response.data.Data],
          showData: [...newdata, response.data.Data],
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
        tempData: { ID: 0, Name: "", DepartmentID: 0, Department: "" },
      }));
    }
  };

  const deleteCourse: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((course) => course.ID === id);
    if (data) {
      try {
        const response = await axios.delete<
          BasicCourseResponse,
          AxiosResponse<BasicCourseResponse, ErrorResponse>
        >(AdminAPI.Course, {
          data,
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const newdata = states.masterData.filter(
            (course) => course.ID !== id
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

  const filterCourse: () => void = () => {
    let newdata = states.masterData;
    // department id
    if (states.tempData.DepartmentID !== 0) {
      newdata = newdata.filter(
        (course) => course.DepartmentID === states.tempData.DepartmentID
      );
    }
    // name
    if (states.tempData.Name !== "") {
      newdata = newdata.filter((course) =>
        course.Name.toLowerCase().includes(states.tempData.Name.toLowerCase())
      );
    }
    setStates((prev) => ({ ...prev, showData: newdata }));
  };

  useEffect(() => {
    getDept();
    getCourse();
  }, []);
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:flex-1/2">
          <input
            type="text"
            placeholder="Course"
            value={states.tempData.Name}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, Name: e.target.value },
              }));
            }}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
          />
        </div>
        <div className="w-full lg:flex-1/2">
          <select
            name="department"
            id="department"
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            value={states.tempData.DepartmentID}
            onChange={(e) => {
              const data = states.uniqueDept.find(
                (dept) => dept.ID === Number(e.target.value)
              );
              if (data) {
                setStates((prev) => ({
                  ...prev,
                  tempData: {
                    ...prev.tempData,
                    DepartmentID: data.ID,
                    Department: data.Name,
                  },
                }));
              }
            }}
          >
            <option value={0}>Select Department</option>
            {states.uniqueDept.map((dept) => (
              <option value={dept.ID}>{dept.Name}</option>
            ))}
          </select>
        </div>
        <div className="flex w-full lg:w-5/12 lg:space-x-4">
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
            onClick={states.editMode ? cancleEdit : filterCourse}
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
          <button
            className="p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer"
            onClick={states.editMode ? saveEdit : addCourse}
          >
            {states.editMode ? "Save" : "Add Course"}
          </button>
          <button
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-center cursor-pointer"
            onClick={
              states.masterData.length === states.showData.length
                ? getCourse
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showData: [...prev.masterData],
                      tempData: {
                        ID: 0,
                        Name: "",
                        DepartmentID: 0,
                        Department: "",
                      },
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
        {states.showData.map((course) => (
          <CourseElement
            Data={course}
            onEdit={editCourse}
            onDelete={deleteCourse}
          />
        ))}
      </div>
    </div>
  );
};
export default CoursePage;
