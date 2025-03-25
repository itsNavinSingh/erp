import { Trash2, UserPen } from "lucide-react";
import { PaperData } from "../models/paper";

interface PaperElemProp {
  data: PaperData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const PaperElement: React.FC<PaperElemProp> = ({
  data,
  onEdit,
  onDelete,
  className = "",
}: PaperElemProp) => {
  return (
    <div
      className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-full lg:w-1/12">
        <div className="text-lg font-semibold">{data.ID}.</div>
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold">
          {data.Name} ({data.Type})
          {data.Syllabus === ""
            ? ""
            : <a target="_blank" href={data.Syllabus} className="text-sm italic ml-2 text-gray-700 dark:text-gray-300">{"[Syllabus]"}</a>}
        </p>
        <p className="text-sm italic text-gray-700 dark:text-gray-300">
          {data.DepartmentID}. {data.Department}
        </p>
      </div>
      <div className="w-full lg:w-1/12">
        <p className="text-lg font-semibold">{data.Semister}</p>
      </div>
      <div className="w-full lg:w-2/12 text-center font-semibold text-lg">
        <p className="">Credit L/T/P</p>
        <p className="">
          {data.CreditL}/{data.CreditT}/{data.CreditP}
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
export default PaperElement;
