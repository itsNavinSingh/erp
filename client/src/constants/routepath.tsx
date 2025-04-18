import { RouteObject } from "react-router-dom";
import BufferPage from "../pages/BufferPage";
import LoginPage from "../components/LoginPage";
import AdminRootLayout from "../components/AdminRootLayout";
import TeacherRootLayout from "../components/TeacherRootLayout";
import StudentRootLayout from "../components/StudentRootLayout";
import UserPage from "../pages/admin/userPage";
import StudentPage from "../pages/admin/studentPage";
import DepartmentPage from "../pages/admin/departmentPage";
import CoursePage from "../pages/admin/coursePage";
import TeacherPage from "../pages/admin/teacherPage";
import PaperPage from "../pages/admin/paperPage";
import ClassPage from "../pages/admin/classPage";
import StudentPaperPage from "../pages/admin/studentPaperPage";

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
            },
            {
                path: "student",
                element: <StudentPage />
            },
            {
                path: "department",
                element: <DepartmentPage />
            },
            {
                path: "course",
                element: <CoursePage />
            },
            {
                path: "teacher",
                element: <TeacherPage />
            },
            {
                path: "paper",
                element: <PaperPage />
            },
            {
                path: "class",
                element: <ClassPage />
            },
            {
                path: "studentPaper",
                element: <StudentPaperPage />
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