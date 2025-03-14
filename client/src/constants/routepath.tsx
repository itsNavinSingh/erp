import { RouteObject } from "react-router-dom";
import BufferPage from "../pages/BufferPage";
import LoginPage from "../components/LoginPage";
import AdminRootLayout from "../components/AdminRootLayout";
import TeacherRootLayout from "../components/TeacherRootLayout";
import StudentRootLayout from "../components/StudentRootLayout";
import UserPage from "../pages/admin/userPage";

export const MainRoutePath: RouteObject[] = [
    {
        path: "/",
        element: <BufferPage />,
    },{
        path: "/login",
        element: <LoginPage />,
    },{
        path: "/admin",
        element: <AdminRootLayout />,
        children: [
            {
                path: "",
                element: <UserPage />,
            }
        ],
    }, {
        path: "/teacher",
        element: <TeacherRootLayout />
    }, {
        path: "/student",
        element: <StudentRootLayout />
    }
]