import { BookType, GraduationCap, LucideProps, Network, School, User } from "lucide-react";

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
];