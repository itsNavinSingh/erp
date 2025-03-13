import { AdminSidebar } from "../constants/sidebar";
import SideBar from "./SideBar";

const TeacherRootLayout: React.FC = () => {
  return (
    <div className="flex bg-white dark:bg-black">
      <SideBar sidebardata={AdminSidebar} />
    </div>
  );
};
export default TeacherRootLayout;
