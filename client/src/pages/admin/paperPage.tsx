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
import PaperElement from "../../components/paperElement";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { AdminAPI } from "../../constants/apiroute";

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
      >(AdminAPI.Department, { withCredentials: true });
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
      >(AdminAPI.Paper, { withCredentials: true });
      if (response.status === 200) {
        const newdata = response.data.Data;
        console.log(newdata);
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
      >(AdminAPI.Paper, states.tempData, { withCredentials: true });
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
      >(AdminAPI.Paper, {
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

  const saveEdit: () => void = async () => {
    try {
      const response = await axios.patch<
        BasicPaperResponse,
        AxiosResponse<BasicPaperResponse, ErrorResponse>
      >(AdminAPI.Paper, states.tempData, {
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
        editModel: false,
        tempData: defaultPaper(),
      }));
    }
  };

  const filterPaper: () => void = () => {
    let newdata = states.masterData;
    // name
    if (states.tempData.Name !== "") {
      newdata = newdata.filter((pep) =>
        pep.Name.toLowerCase().includes(states.tempData.Name.toLowerCase())
      );
    }
    // upc
    if (states.tempData.UPC !== 0) {
      newdata = newdata.filter((pep) =>
        String(pep.UPC).includes(String(states.tempData.UPC))
      );
    }
    // semister
    if (states.tempData.Semister !== 0) {
      newdata = newdata.filter(
        (pep) => pep.Semister === states.tempData.Semister
      );
    }
    // departmentid
    if (states.tempData.DepartmentID !== 0) {
      newdata = newdata.filter(
        (pep) => pep.DepartmentID === states.tempData.DepartmentID
      );
    }
    // type
    if (states.tempData.Type !== "") {
      newdata = newdata.filter((pep) =>
        pep.Type.toLowerCase().includes(states.tempData.Type.toLowerCase())
      );
    }
    // credit l
    if (states.tempData.CreditL !== 0) {
      newdata = newdata.filter(
        (pep) => pep.CreditL === states.tempData.CreditL
      );
    }
    // credit t
    if (states.tempData.CreditT !== 0) {
      newdata = newdata.filter(
        (pep) => pep.CreditT === states.tempData.CreditT
      );
    }
    // credit p
    if (states.tempData.CreditP !== 0) {
      newdata = newdata.filter(
        (pep) => pep.CreditP === states.tempData.CreditP
      );
    }
    setStates((prev) => ({ ...prev, showData: newdata }));
  };
  useEffect(() => {
    getDept();
    getPaper();
  }, []);
  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:flex-1">
          <input
            type="text"
            placeholder="Paper"
            value={states.tempData.Name}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) =>
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, Name: e.target.value },
              }))
            }
          />
        </div>
        <div className="w-full lg:w-1/5">
          <input
            type="number"
            placeholder="UPC"
            value={states.tempData.UPC}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              const data = Number(e.target.value);
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, UPC: data },
              }));
            }}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <select
            name="department"
            id="department"
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            value={states.tempData.DepartmentID}
            onChange={(e) => {
              const dept = states.uniqueDept.find(
                (dp) => dp.ID === Number(e.target.value)
              );
              if (dept) {
                setStates((prev) => ({
                  ...prev,
                  tempData: {
                    ...prev.tempData,
                    DepartmentID: dept.ID,
                    Department: dept.Name,
                  },
                }));
              } else {
                setStates((prev) => ({
                  ...prev,
                  tempData: {
                    ...prev.tempData,
                    DepartmentID: 0,
                    Department: "",
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
        <div className="w-full lg:w-1/6">
          <input
            type="text"
            placeholder="Type"
            value={states.tempData.Type}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) =>
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, Type: e.target.value },
              }))
            }
          />
        </div>
      </div>
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <div className="w-full lg:w-1/4">
          <input
            type="text"
            placeholder="Syllabus"
            value={states.tempData.Syllabus}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, Syllabus: e.target.value },
              }));
            }}
          />
        </div>
        <div className="w-full lg:w-1/12">
          <input
            type="number"
            placeholder="Semister"
            value={states.tempData.Semister}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: {
                  ...prev.tempData,
                  Semister: Number(e.target.value),
                },
              }));
            }}
          />
        </div>
        <div className="w-full lg:w-1/12">
          <input
            type="number"
            placeholder="CreditL"
            value={states.tempData.CreditL}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, CreditL: Number(e.target.value) },
              }));
            }}
          />
        </div>
        <div className="w-full lg:w-1/12">
          <input
            type="number"
            placeholder="CreditT"
            value={states.tempData.CreditT}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, CreditT: Number(e.target.value) },
              }));
            }}
          />
        </div>
        <div className="w-full lg:w-1/12">
          <input
            type="number"
            placeholder="CreditP"
            value={states.tempData.CreditP}
            className="w-full p-2 rounded bg-gray-300 dark:bg-gray-700"
            onChange={(e) => {
              setStates((prev) => ({
                ...prev,
                tempData: { ...prev.tempData, CreditP: Number(e.target.value) },
              }));
            }}
          />
        </div>
        <div className="flex-1 flex lg:space-x-4">
          <button
            className="px-4 p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
            onClick={states.editModel ? cancleEdit : filterPaper}
          >
            {states.editModel ? "Cancle" : "Filter"}
          </button>
          <button
            className="px-4 p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded cursor-pointer"
            onClick={states.editModel ? saveEdit : addPaper}
          >
            {states.editModel ? "Save" : "Add Paper"}
          </button>
          <button
            className="px-4 p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded flex items-center justify-evenly cursor-pointer"
            onClick={
              states.masterData.length === states.showData.length
                ? getPaper
                : () => {
                    setStates((prev) => ({
                      ...prev,
                      showData: [...prev.masterData],
                      tempData: defaultPaper(),
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
        {states.showData.map((pep) => (
          <PaperElement data={pep} onEdit={editPaper} onDelete={deletePaper} />
        ))}
      </div>
    </div>
  );
};
export default PaperPage;
