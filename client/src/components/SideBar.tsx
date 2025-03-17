import { ChevronFirst, ChevronLast } from "lucide-react";
import { SidebarData } from "../constants/sidebar";
import SidebarItem from "./SidebarItem";
import { useEffect, useState } from "react";
import ModeChange from "./ModeChange";
import { useUserStore } from "../store/userInfo";

interface SideBarProp {
  sidebardata: SidebarData[];
  className?: string;
}

const SideBar: React.FC<SideBarProp> = ({ sidebardata, className = "" }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const user = useUserStore();
  useEffect(() => {
    user.setValues();
  }, []);
  return (
    <aside className={`min-h-screen ${className}`}>
      <nav className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 border-r dark:border-r-white shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <p
            className={`overflow-hidden transition-all text-2xl font-semibold text-black dark:text-white ${
              expanded ? "w-auto" : "w-0"
            }`}
          >
            SmartProf
          </p>
          <button
            className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronFirst className="text-black dark:text-white" />
            ) : (
              <ChevronLast className="text-black dark:text-white" />
            )}
          </button>
        </div>
        <div className="flex-1 flex flex-col px-3">
          <ul className="flex-1">
            {sidebardata.map((data, idx) => (
              <SidebarItem sidebardata={data} key={idx} expanded={expanded} />
            ))}
          </ul>
          <ModeChange expanded={expanded} />
        </div>
        <div className="border-t dark:border-t-white flex p-3">
          <div className="h-10 w-10 rounded-md bg-gray-900 dark:bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-semibold font-mono text-white dark:text-black">
              {user.Name[0]}
            </span>
          </div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-auto ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-black dark:text-white transition-all">
                {user.Name}
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-300 transition-all">
                {user.Email}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
export default SideBar;
