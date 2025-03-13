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
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        sidebardata.Active
          ? "bg-gradient-to-tr from-indigo-200 dark:from-indigo-800 to-indigo-100 dark:to-indigo-900 text-indigo-800 dark:text-indigo-200"
          : "hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-600 dark:text-gray-300"
      } ${className}`}
    >
      {<sidebardata.Icon size={20} />}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3" : "w-0"
        }`}
      >
        {sidebardata.Text}
      </span>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {sidebardata.Text}
        </div>
      )}
    </li>
  );
};
export default SidebarItem;
