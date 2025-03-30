import { Trash2, UserPen } from "lucide-react";
import { StudentPaperData } from "../models/studentPaper";

interface StdPepElemProp {
  Data: StudentPaperData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const StudentPaperElement: React.FC<StdPepElemProp> = ({
  Data,
  onDelete,
  onEdit,
  className = "",
}: StdPepElemProp) => {
  return (
    <div
      className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-1/12">
        <p className="text-lg font-semibold">{Data.ID} </p>
      </div>
      <div className="flex-1/2">
        <p className="text-lg font-semibold">{Data.StudentID}. {Data.Student}</p>
      </div>
      <div className="flex-1/2">
        <p className="text-lg font-semibold">{Data.PaperID}. {Data.Paper}</p>
      </div>
      <div className="w-1/12">
        <UserPen onClick={()=>onEdit(Data.ID)} className="cursor-pointer" />
      </div>
      <div className="w-1/12">
        <Trash2 onClick={()=>onDelete(Data.ID)} className="cursor-pointer" />
      </div>
    </div>
  );
};
export default StudentPaperElement;
