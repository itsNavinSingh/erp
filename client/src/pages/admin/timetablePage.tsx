import { useEffect, useState } from "react";
import {
  BasicTimetableResponse,
  defaultTimetable,
  GetTimetableResponse,
  TimetableData,
} from "../../models/timetable";
import { useToastStore } from "../../store/toast";
import axios, { AxiosResponse } from "axios";
import { AdminAPI } from "../../constants/apiroute";
import { ErrorResponse } from "../../models/error";

type MasterTtState = {
  masterData: TimetableData[];
  showData: TimetableData[];
  tempData: TimetableData;
  editMode: boolean;
};

const TimetablePage: React.FC = () => {
  const [states, setStates] = useState<MasterTtState>({
    masterData: [],
    showData: [],
    tempData: defaultTimetable(),
    editMode: false,
  });
  const toast = useToastStore();
  const getTimetable: () => void = async () => {
    try {
      const response = await axios.get<
        GetTimetableResponse,
        AxiosResponse<GetTimetableResponse, ErrorResponse>
      >(AdminAPI.Timetable, { withCredentials: true });
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

  const addTimetable: () => void = async () => {
    if (
      states.tempData.ClassID == 0 ||
      states.tempData.TeacherID == 0 ||
      states.tempData.Day == 0 ||
      states.tempData.Location == "" ||
      states.tempData.Start == ""
    ) {
      toast.showToast("Please fill all the field", false);
      return;
    }
    try {
      const response = await axios.post<
        BasicTimetableResponse,
        AxiosResponse<BasicTimetableResponse, ErrorResponse>
      >(AdminAPI.Timetable, states.tempData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status == 200) {
        const newdata = [...states.masterData, response.data.Data];
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
        toast.showToast(error.response?.data?.Mag || "An Error Occured", false);
      } else {
        toast.showToast(String(error), false);
      }
    } finally {
      setStates((prev) => ({
        ...prev,
        tempData: defaultTimetable(),
      }));
    }
  };

  const editTimetable: (id: number) => void = (id: number) => {};

  const cancleEdit: () => void = () => {};

  const saveEdit: () => void = async () => {};

  const deleteTimetable: (id: number) => void = async (id: number) => {};

  const filterTimetable: () => void = () => {};

  useEffect(() => {
    getTimetable();
  }, []);
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      // todo
      <div className="space-y-3">// todo</div>
    </div>
  );
};

export default TimetablePage;
