import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useToastStore } from "../../store/toast";
import UserElement from "../../components/userElement";
import { RefreshCcw } from "lucide-react";

type User = {
  UserID: number;
  Name: string;
  Email: string;
  Role: string;
};
type GetUserResponse = {
  Msg: string;
  Data: User[];
};
type BasicUserResponse = {
  Msg: string;
  Data: User;
};
type ErrorResponse = {
  Msg: string;
};
const UserPage: React.FC = () => {
  const [mainData, setMainData] = useState<User[]>([]);
  const [userdata, setuserdata] = useState<User[]>([...mainData]);
  const [tempUser, setTempUser] = useState<User>({
    UserID: 0,
    Name: "",
    Email: "",
    Role: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const toast = useToastStore();

  const getUserData: () => void = async () => {
    try {
      const response = await axios.get<
        GetUserResponse,
        AxiosResponse<GetUserResponse, ErrorResponse>
      >("/api/admin/user", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMainData(response.data.Data);
        setuserdata([...response.data.Data]);
      } else {
        toast.showToast(response.data.Msg, false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.showToast(
          error.response?.data?.Msg || "An error occurred",
          false
        );
      } else {
        toast.showToast(String(error), false);
      }
    }
  };

  const addUser: () => void = async () => {
    if (tempUser.Name !== "" && tempUser.Email !== "" && tempUser.Role !== "") {
      try {
        const response = await axios.post<
          BasicUserResponse,
          AxiosResponse<BasicUserResponse, ErrorResponse>
        >("/api/admin/user", tempUser, { withCredentials: true });
        if (response.status === 200) {
          const newdata = [...mainData, response.data.Data];
          setMainData(newdata);
          setuserdata([...newdata]);
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
        setTempUser({ UserID: 0, Name: "", Email: "", Role: "" });
      }
    }
  };

  const DeleteUser: (id: number) => void = async (id: number) => {
    const data = mainData.find((user) => user.UserID === id);
    if (data) {
      try {
        const response = await axios.delete<
          BasicUserResponse,
          AxiosResponse<BasicUserResponse, ErrorResponse>
        >("/api/admin/user", {
          data,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          const newdata = mainData.filter((user) => user.UserID !== response.data.Data.UserID);
          setMainData(newdata);
          setuserdata([...newdata]);
          toast.showToast(response.data.Msg, true);
        } else {
          toast.showToast(response.data.Msg, false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.showToast(
            error.response?.data?.Msg || "An error occured",
            false
          );
        } else {
          toast.showToast(String(error), false);
        }
      }
    }
  };

  const EditUser: (id: number) => void = (id: number) => {
    const data = mainData.find((user) => user.UserID === id);
    if (data) {
      setTempUser(data);
      setEditMode(true);
    }
  };
  const saveEditUser: () => void = async () => {
    try {
      const response = await axios.patch<
        BasicUserResponse,
        AxiosResponse<BasicUserResponse, ErrorResponse>
      >("/api/admin/user", tempUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        const newdata = [
          ...mainData.filter(
            (user) => user.UserID !== response.data.Data.UserID
          ),
          response.data.Data,
        ];
        setMainData(newdata);
        setuserdata([...newdata]);
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
      setTempUser({ UserID: 0, Name: "", Email: "", Role: "" });
      setEditMode(false);
    }
  };
  const cancleEditMode: () => void = () => {
    setTempUser({ UserID: 0, Name: "", Email: "", Role: "" });
    setEditMode(false);
  };
  const filterUser: () => void = () => {
    setuserdata(
      mainData.filter((user) => {
        return (
          (tempUser.Name === "" ||
            user.Name.toLowerCase().includes(tempUser.Name.toLowerCase())) &&
          (tempUser.Email === "" ||
            user.Email.toLowerCase().includes(tempUser.Email.toLowerCase())) &&
          (tempUser.Role === "" || user.Role === tempUser.Role)
        );
      })
    );
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="p-4 w-full h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-all">
      <div className="block lg:flex space-x-4 my-4 text-lg font-medium space-y-2 lg:space-y-0">
        <input
          type="text"
          placeholder="Enter Name"
          value={tempUser.Name}
          onChange={(e) => {
            setTempUser({ ...tempUser, Name: e.target.value });
          }}
          className="w-full p-2 lg:flex-1/2 rounded bg-gray-300 dark:bg-gray-700"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={tempUser.Email}
          onChange={(e) => {
            setTempUser({ ...tempUser, Email: e.target.value });
          }}
          className="w-full p-2 lg:flex-1/2 rounded bg-gray-300 dark:bg-gray-700"
        />
        <select
          name="role"
          id="role"
          value={tempUser.Role}
          onChange={(e) => {
            setTempUser({ ...tempUser, Role: e.target.value });
          }}
          className="p-2 w-full lg:w-4/12 rounded bg-gray-300 dark:bg-gray-700"
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        <button
          onClick={editMode ? cancleEditMode : filterUser}
          className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded w-3/12 cursor-pointer"
        >
          {editMode ? "Cancle" : "Filter"}
        </button>
        <button
          onClick={editMode ? saveEditUser : addUser}
          className="p-2 bg-green-500 hover:bg-green-600 dark:hover:bg-green-400 rounded w-3/12 cursor-pointer"
        >
          {editMode ? "Save" : "Add User"}
        </button>
        <button
          onClick={
            mainData.length === userdata.length
              ? getUserData
              : () => {
                setTempUser({UserID: 0, Name: "", Email: "", Role: ""})
                  setuserdata([...mainData]);
                }
          }
          className="p-2 dark:bg-blue-700 dark:hover:bg-blue-600 bg-blue-300 hover:bg-blue-400 rounded w-3/12 flex items-center justify-evenly cursor-pointer"
        >
          <RefreshCcw className="" />{" "}
          <span>
            {mainData.length === userdata.length ? "Refresh" : "Clear"}
          </span>
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto">
        {userdata.map((data) => (
          <UserElement
            UserID={data.UserID}
            Name={data.Name}
            Email={data.Email}
            Role={data.Role}
            onDelete={DeleteUser}
            onEdit={EditUser}
            key={data.UserID}
          />
        ))}
      </div>
    </div>
  );
};
export default UserPage;
