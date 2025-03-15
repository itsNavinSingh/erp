import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../constants/sidebar";
import SideBar from "./SideBar";
const AdminRootLayout: React.FC = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900">
      <SideBar sidebardata={AdminSidebar} />
      <Outlet />
    </div>
  );
};
export default AdminRootLayout;
