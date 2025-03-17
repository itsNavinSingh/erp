import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useToastStore } from "../../store/toast";
import {
  BasicStudentResponse,
  GetStudentsResponse,
  StudentData,
} from "../../models/student";
import StudentElement from "../../components/studentElement";
import { RefreshCcw } from "lucide-react";
import { ErrorResponse } from "../../models/error";
import { CourseData, GetCourseResponse } from "../../models/course";

type MasterStudentState = {
  masterData: StudentData[];
  showStudent: StudentData[];
  tempStudent: StudentData;
  editMode: boolean;
  uniqueCourse: CourseData[];
};

const StudentPage: React.FC = () => {
  const [states, setStates] = useState<MasterStudentState>({
    masterData: [],
    showStudent: [],
    tempStudent: {
      ID: 0,
      UserID: 0,
      Name: "",
      Email: "",
      Dob: "",
      Phone: 0,
      EnrollmentYear: 0,
      Semister: 0,
      CourseID: 0,
      Course: "",
    },
    editMode: false,
    uniqueCourse: [],
  });
  const toast = useToastStore();

  const getCourseData: () => void = async () => {
    try {
      const response = await axios.get<
        GetCourseResponse,
        AxiosResponse<GetCourseResponse, ErrorResponse>
      >("/api/admin/course", { withCredentials: true });
      if (response.status === 200) {
        const data = response.data.Data;
        setStates((prev) => ({ ...prev, uniqueCourse: data }));
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

  const getStudentData: () => void = async () => {
    try {
      const response = await axios.get<
        GetStudentsResponse,
        AxiosResponse<GetStudentsResponse, ErrorResponse>
      >("/api/admin/student", { withCredentials: true });
      if (response.status === 200) {
        const data = response.data.Data;
        setStates((prev) => ({ ...prev, masterData: data, showStudent: data }));
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

  const addStudent: () => void = async () => {
    if (
      states.tempStudent.UserID === 0 ||
      states.tempStudent.Dob === "" ||
      states.tempStudent.Phone === 0 ||
      states.tempStudent.EnrollmentYear === 0 ||
      states.tempStudent.CourseID === 0
    ) {
      return;
    }
    try {
      const response = await axios.post<
        BasicStudentResponse,
        AxiosResponse<BasicStudentResponse, ErrorResponse>
      >("/api/admin/student", states.tempStudent, { withCredentials: true });
      if (response.status === 200) {
        const newdata = [...states.masterData, response.data.Data];
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showStudent: newdata,
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
        tempStudent: {
          ID: 0,
          UserID: 0,
          Name: "",
          Email: "",
          Dob: "",
          Phone: 0,
          EnrollmentYear: 0,
          Semister: 0,
          CourseID: 0,
          Course: "",
        },
      }));
    }
  };

  const deleteStudent: (id: number) => void = async (id: number) => {
    const data = states.masterData.find((student) => student.ID === id);
    if (data) {
      try {
        const response = await axios.delete<
          BasicStudentResponse,
          AxiosResponse<BasicStudentResponse, ErrorResponse>
        >("/api/admin/student", {
          data,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.status === 200) {
          const newdata = states.masterData.filter(
            (student) => student.ID !== response.data.Data.ID
          );
          setStates((prev) => ({
            ...prev,
            masterData: newdata,
            showStudent: newdata,
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

  const saveEditStudent: () => void = async () => {
    try {
      const response = await axios.patch<
        BasicStudentResponse,
        AxiosResponse<BasicStudentResponse, ErrorResponse>
      >("/api/admin/student", states.tempStudent, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        const newdata = [
          ...states.masterData.filter(
            (student) => student.ID !== response.data.Data.ID
          ),
          response.data.Data,
        ];
        setStates((prev) => ({
          ...prev,
          masterData: newdata,
          showStudent: newdata,
        }));
        toast.showToast(response.data.Msg, true);
      } else {
        toast.showToast(response.data.Msg, false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.showToast(
          error.response?.data?.Msg || "An Error Occured!",
          false
        );
      } else {
        toast.showToast(String(error), false);
      }
    } finally {
      setStates((prev) => ({
        ...prev,
        editMode: false,
        tempStudent: {
          ID: 0,
          UserID: 0,
          Name: "",
          Email: "",
          Dob: "",
          Phone: 0,
          EnrollmentYear: 0,
          Semister: 0,
          CourseID: 0,
          Course: "",
        },
      }));
    }
  };
  const startEditMode: (id: number) => void = (id: number) => {
    const data = states.masterData.find((student) => student.ID === id);
    if (data) {
      setStates((prev) => ({ ...prev, editMode: true, tempStudent: data }));
    }
  };
  const cancleEditMode: () => void = () => {
    setStates((prev) => ({
      ...prev,
      editMode: false,
      tempStudent: {
        ID: 0,
        UserID: 0,
        Name: "",
        Email: "",
        Dob: "",
        Phone: 0,
        EnrollmentYear: 0,
        Semister: 0,
        CourseID: 0,
        Course: "",
      },
    }));
  };
  const filterStudent: () => void = () => {
    let data: StudentData[] = states.masterData;
    // by user id
    if (states.tempStudent.UserID !== 0) {
      data = data.filter((each) => String(each.UserID).includes(String(states.tempStudent.UserID)));
    }
    // dob
    if (states.tempStudent.Dob !== "") {
      data = data.filter((each) => each.Dob.includes(String(states.tempStudent.Dob)));
    }
    // phone
    if (states.tempStudent.Phone !== 0) {
      data = data.filter((each) => String(each.Phone).includes(String(states.tempStudent.Phone)));
    }
    // year
    if (states.tempStudent.EnrollmentYear !== 0) {
      data = data.filter((each) => each.EnrollmentYear === states.tempStudent.EnrollmentYear);
    }
    // course
    if (states.tempStudent.CourseID !== 0) {
      data = data.filter((each) => each.CourseID === states.tempStudent.CourseID);
    }

    setStates((prev) => ({...prev, showStudent: data}));
  };

  useEffect(() => {
    getCourseData();
    getStudentData();
  }, []);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex my-4 text-sm font-medium space-y-2 lg:space-y-0 lg:space-x-2 items-end text-center">
        <div className="w-full lg:w-2/12 ">
          <p className="text-center">UserID</p>
          <input
            type="number"
            value={states.tempStudent.UserID}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempStudent: {
                  ...prev.tempStudent,
                  UserID: Number(e.target.value),
                },
              }));
            }}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 w-full"
          />
        </div>
        <div className="w-full lg:w-2/12">
          <p className="text-center">DoB</p>
          <input
            type="date"
            placeholder="DoB"
            value={
              states.tempStudent.Dob ? states.tempStudent.Dob.split("T")[0] : ""
            }
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempStudent: {
                  ...prev.tempStudent,
                  Dob: new Date(e.target.value).toISOString(),
                },
              }));
            }}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 w-full"
          />
        </div>
        <div className="w-full lg:w-3/12">
          <p className="text-center">Phone</p>
          <input
            type="number"
            placeholder="Phone"
            value={states.tempStudent.Phone}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempStudent: {
                  ...prev.tempStudent,
                  Phone: Number(e.target.value),
                },
              }));
            }}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 w-full"
          />
        </div>
        <div className="w-full lg:w-2/12">
          <p className="text-center">Enrollment</p>
          <input
            type="number"
            placeholder="Year"
            value={states.tempStudent.EnrollmentYear}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempStudent: {
                  ...prev.tempStudent,
                  EnrollmentYear: Number(e.target.value),
                },
              }));
            }}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 w-full"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <p className="text-center">Course</p>
          <select
            name="course"
            id="course"
            value={states.tempStudent.CourseID}
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempStudent: {
                  ...prev.tempStudent,
                  CourseID: Number(e.target.value),
                  Course:
                    prev.uniqueCourse.find(
                      (data) => data.ID === Number(e.target.value)
                    )?.Name || "",
                },
              }));
            }}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 w-full"
          >
            <option value={0}>Select Course</option>
            {states.uniqueCourse.map((data) => (
              <option value={data.ID}>{data.Name}</option>
            ))}
          </select>
        </div>
        <div className="">
          <button
            onClick={states.editMode ? cancleEditMode : filterStudent}
            className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer w-full"
          >
            {states.editMode ? "Cancle" : "Filter"}
          </button>
        </div>
        <div className="lg:w-1/4">
          <button
            onClick={states.editMode ? saveEditStudent : addStudent}
            className="p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer w-full"
          >
            {states.editMode ? "Save" : "Add Student"}
          </button>
        </div>

        <div className="w-1/4">
          <button
            onClick={
              states.masterData.length === states.showStudent.length
                ? getStudentData
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showStudent: [...prev.masterData],
                      tempStudent: {
                        ID: 0,
                        UserID: 0,
                        Name: "",
                        Email: "",
                        Dob: "",
                        Phone: 0,
                        EnrollmentYear: 0,
                        Semister: 0,
                        CourseID: 0,
                        Course: "",
                      },
                    }));
                  }
            }
            className="w-full p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-evenly cursor-pointer"
          >
            <RefreshCcw className="" />{" "}
            <span>
              {states.masterData.length === states.showStudent.length
                ? "Refresh"
                : "Clear"}
            </span>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {states.showStudent.map((data) => (
          <StudentElement
            Data={data}
            onEdit={startEditMode}
            onDelete={deleteStudent}
          />
        ))}
      </div>
    </div>
  );
};
export default StudentPage;
