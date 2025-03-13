import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../constants/sidebar";
import SideBar from "./SideBar";
const AdminRootLayout: React.FC = () => {
  return (
    <div className="flex bg-white dark:bg-black">
      <SideBar sidebardata={AdminSidebar} />
      <Outlet />
    </div>
  );
};
export default AdminRootLayout;
