import { Trash2, UserPen } from "lucide-react";
import { ClassData } from "../models/class";

interface ClassElemProp {
  data: ClassData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const ClassElement: React.FC<ClassElemProp> = ({
  data,
  onEdit,
  onDelete,
  className = "",
}: ClassElemProp) => {
  return (
    <div
      className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-1/12">
        <p className="text-lg font-semibold">{data.ID}</p>
      </div>
      <div className="flex-1/2">
        <p className="text-lg font-semibold">
          {data.PaperID}. {data.Paper}
        </p>
      </div>
      <div className="w-1/6">
        <p className="text-lg italic font-semibold text-gray-700 dark:text-gray-300">
          {data.Type}
        </p>
      </div>
      <div className="flex-1/2">
        <p className="text-lg font-semibold">
          {data.TeacherID}. {data.Teacher}
        </p>
      </div>
      <div className="w-1/12">
        <UserPen onClick={() => onEdit(data.ID)} className="cursor-pointer" />
      </div>
      <div className="w-1/12">
        <Trash2 onClick={() => onDelete(data.ID)} className="cursor-pointer" />
      </div>
    </div>
  );
};
export default ClassElement;
