import { Boxes, GraduationCap, LucideProps, Package, Receipt, School, User } from "lucide-react";

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
        Icon: School,
        Route: "/admin/department",
        Text: "Departments",
    },
    {
        Icon: Boxes,
        Route: "/admin/ghi",
        Text: "Inventory",
    },
    {
        Icon: Package,
        Route: "/admin/def",
        Text: "Orders",
    },
    {
        Icon: Receipt,
        Route: "/admin/abc",
        Text: "Billings",
    }
];