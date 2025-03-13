import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useUserStore } from "../store/userInfo";

const BufferPage: React.FC = () => {
  const navigate = useNavigate();
  const userData = useUserStore();

  useEffect(() => {
    axios.get("/validate", {
      withCredentials: true,
    }).then((response) => {
      if (response.data.Role) {
        switch (response.data.Role) {
          case "Student":
            userData.setRole("Student");
            navigate("/student");
            break;
          case "Teacher":
            userData.setRole("Teacher");
            navigate("/teacher");
            break;
          case "Admin":
            userData.setRole("Admin");
            navigate("/admin");
            break;
          default:
            navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }).catch(() => {
      navigate("/login");
    }).finally(() => {
    });
  }, [navigate, userData]);


  return (
    <LoadingScreen />
  );
};
export default BufferPage;
