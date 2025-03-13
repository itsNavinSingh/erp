import { Moon, Sun } from "lucide-react";
import { DarkMode, useDarkModeStore } from "../store/darkMode";
interface ModeChangeprop {
    expanded: boolean;
    className?: string;
}
const ModeChange: React.FC<ModeChangeprop> = ({expanded, className=""}) => {
  const darkMode: DarkMode = useDarkModeStore();
  return (
    <div
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-600 dark:text-gray-300 ${className}`} onClick={darkMode.toggle}
    >
      {darkMode.isDark ? <Sun size={20} /> : <Moon size={20} />}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3" : "w-0"
        }`}
      >
        {darkMode.isDark ? "Light Mode" : "Dark Mode"}
      </span>
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {darkMode.isDark ? "Light" : "Dark"}
        </div>
      )}
    </div>
  );
};
export default ModeChange;
