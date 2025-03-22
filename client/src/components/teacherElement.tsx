import { Trash2, UserPen } from "lucide-react";
import { TeacherData } from "../models/teacher";

interface TeacherElemProp {
  Data: TeacherData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const TeacherElement: React.FC<TeacherElemProp> = ({
  Data,
  onEdit,
  onDelete,
  className = "",
}: TeacherElemProp) => {
  return (
    <div
      className={`flex w-full p-2 px-4 shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-1/12">
        <p className="text-lg font-semibold">{Data.ID}.</p>
      </div>
      <div className="flex-2/3">
        <p className="text-lg font-semibold">
          {Data.Prefix} {Data.Name}
        </p>
        <p className="italic text-sm dark:text-gray-200 text-gray-800">
          {Data.UserID}. {Data.Email}
        </p>
      </div>
      <div className="w-1/4">
        <p className="text-lg font-medium">{Data.Phone}</p>
      </div>
      <div className="flex-1/3">
        <p className="text-lg font-medium">{Data.Department}</p>
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
export default TeacherElement;
