import { BarChart3, Boxes, LucideProps, Package, Receipt, User, UserCircle } from "lucide-react";

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
        Icon: BarChart3,
        Route: "/admin/lkj",
        Text: "Statistics",
    },
    {
        Icon: UserCircle,
        Route: "/admin/fgh",
        Text: "Users",
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