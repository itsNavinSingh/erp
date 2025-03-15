import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "../constants/sidebar";

interface SidebarItemProp {
  sidebardata: SidebarData;
  expanded: boolean;
  className?: string;
}
const SidebarItem: React.FC<SidebarItemProp> = ({
  sidebardata,
  expanded,
  className = "",
}) => {
  const location = useLocation();
  const isActive = location.pathname === sidebardata.Route;
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive
          ? "bg-gradient-to-tr from-indigo-200 dark:from-indigo-800 to-indigo-100 dark:to-indigo-900 text-indigo-800 dark:text-indigo-200"
          : "hover:bg-indigo-300 dark:hover:bg-indigo-700 text-gray-600 dark:text-gray-300"
      } ${className}`}
    >
      <Link to={sidebardata.Route} key={sidebardata.Text} className="flex">
        {<sidebardata.Icon size={20} />}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-3" : "w-0"
          }`}
        >
          {sidebardata.Text}
        </span>
      </Link>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {sidebardata.Text}
        </div>
      )}
    </li>
  );
};
export default SidebarItem;
