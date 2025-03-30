import { BookText, BookType, GraduationCap, LucideProps, Network, School, SquarePlus, University, User } from "lucide-react";

export interface SidebarData {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Route: string;
    Text: string;
}

export const AdminSidebar: SidebarData[] = [
    {
        Icon: User,
        Route: "/admin",
        Text: "Users",
    },
    {
        Icon: GraduationCap,
        Route: "/admin/student",
        Text: "Students",
    },
    {
        Icon: BookType,
        Route: "/admin/teacher",
        Text: "Teachers"
    },
    {
        Icon: Network,
        Route: "/admin/department",
        Text: "Departments",
    },
    {
        Icon: School,
        Route: "/admin/course",
        Text: "Courses",
    },
    {
        Icon: BookText,
        Route: "/admin/paper",
        Text: "Papers"
    },
    {
        Icon: University,
        Route: "/admin/class",
        Text: "Classes"
    },
    {
        Icon: SquarePlus,
        Route: "/admin/studentPaper",
        Text: "Student Paper"
    },
];