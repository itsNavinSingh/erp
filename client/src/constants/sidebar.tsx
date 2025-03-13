import { BarChart3, Boxes, LayoutDashboard, LucideProps, Package, Receipt, UserCircle } from "lucide-react";

export interface SidebarData {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    Route: string;
    Text: string;
    Active: boolean;
}

export const AdminSidebar: SidebarData[] = [
    {
        Icon: LayoutDashboard,
        Route: "",
        Text: "Dashboard",
        Active: false,
    },
    {
        Icon: BarChart3,
        Route: "",
        Text: "Statistics",
        Active: true,
    },
    {
        Icon: UserCircle,
        Route: "",
        Text: "Users",
        Active: false,
    },
    {
        Icon: Boxes,
        Route: "",
        Text: "Inventory",
        Active: false,
    },
    {
        Icon: Package,
        Route: "",
        Text: "Orders",
        Active: false
    },
    {
        Icon: Receipt,
        Route: "",
        Text: "Billings",
        Active: false,
    }
];