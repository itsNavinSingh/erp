import { Trash2, UserPen } from "lucide-react";
import { DepartmentData } from "../models/department";

interface DeptElemProp {
  Data: DepartmentData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const DepartmentElement: React.FC<DeptElemProp> = ({
  Data,
  onEdit,
  onDelete,
  className = "",
}: DeptElemProp) => {
  return (
    <div
      className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-1/12">
        <p className="text-lg font-semibold">{Data.ID}</p>
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{Data.Name}</p>
      </div>
      <div className="w-1/12">
        <UserPen className="cursor-pointer" onClick={() => onEdit(Data.ID)} />
      </div>
      <div className="w-1/12">
      <Trash2 className="cursor-pointer" onClick={() => onDelete(Data.ID)} />
      </div>
    </div>
  );
};
export default DepartmentElement;
