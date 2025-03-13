import { Moon, Sun } from "lucide-react";
import { useDarkModeStore } from "../store/darkMode";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userInfo";

interface LoginReqData {
  Email: string;
  Password: string;
  Role: string;
  Device: string;
}

interface LoginResData {
  Msg: string;
}


const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginReqData>({Email: "", Password: "", Role: "Student", Device: "web"})
  const [MsgData, setMsgData] = useState<LoginResData>({Msg: ""});
  const darkMode = useDarkModeStore();
  const navigate = useNavigate();
  const user = useUserStore();

  const handleSubmit = async () => {
    setMsgData({Msg: ""});
    try {
      const response = await axios.post<LoginResData>("/login", loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const role: string = loginData.Role;
        user.setRole(role);
        setLoginData({Email: "", Password: "", Role: "", Device: "web"});
        navigate("/" + role.toLowerCase());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMsgData({Msg: error.response.data.Msg || "An error occurred"});
        } else if (error.request) {
          setMsgData({Msg: "No Response from the server"});
        } else {
          setMsgData({Msg: "An unexpected error occurred"});
        }
      } else {
        setMsgData({Msg: "An unexpected error occurred"});
      }
    }
  }
  return (
    <div className="h-screen flex flex-col">
    <div className="flex px-4 bg-gray-100 dark:bg-gray-900 pt-4">
      <div className="flex-1">
        <p className="text-xl font-semibold text-black dark:text-white">SmartProf RLAC</p>
      </div>
      <div className="rounded-full bg-black dark:bg-white p-2">
        {darkMode.isDark ? <Sun size={20} className="cursor-pointer text-white dark:text-black" onClick={darkMode.toggle} /> : <Moon size={20} className="cursor-pointer text-white dark:text-black" onClick={darkMode.toggle} />}
      </div>
    </div>
      <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 w-full flex-1">
        <div className="max-w-md w-full bg-white dark:bg-black rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Sign In
          </h2>
          <div className="space-y-4">
            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={loginData.Email}
                onChange={(e) => {setLoginData({...loginData, Email: e.target.value})}}
                placeholder="name.deptRoll@rla.du.ac.in"
                className="text-black dark:text-white w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginData.Password}
                onChange={(e) => setLoginData({...loginData, Password: e.target.value})}
                placeholder="Enter your password"
                className="text-black dark:text-white w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                I'm
              </label>
              <select
                name="role"
                value={loginData.Role}
                onChange={(e) => setLoginData({...loginData, Role: e.target.value})}
                id="role"
                className="text-black dark:text-white w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
              >
                <option
                  value="Admin"
                  className="text-sm font-medium bg-white dark:bg-black text-black dark:text-white"
                >
                  Admin
                </option>
                <option
                  value="Student"
                  className="text-sm font-medium bg-white dark:bg-black text-black dark:text-white"
                >
                  Student
                </option>
                <option
                  value="Teacher"
                  className="text-sm font-medium bg-white dark:bg-black text-black dark:text-white"
                >
                  Teacher
                </option>
              </select>
              <div className="">
                <p className="text-xl text-red-700 dark:text-red-400 text-center">{MsgData.Msg}</p>
              </div>
            </div>
            <button onClick={handleSubmit} className="cursor-pointer w-full bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-300 text-white dark:text-black font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;