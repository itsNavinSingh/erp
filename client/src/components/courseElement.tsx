import { Trash2, UserPen } from "lucide-react";
import { CourseData } from "../models/course";

interface CourseElemProp {
    Data: CourseData;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className?: string;
}
const CourseElement: React.FC<CourseElemProp> = ({Data, onEdit, onDelete, className=""}: CourseElemProp) => {
    return (
        <div className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}>
            <div className="w-1/12">
            <p className="text-lg font-semibold">{Data.ID}</p>
            </div>
            <div className="flex-1">
            <p className="text-lg font-semibold">{Data.Name}</p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">{Data.DepartmentID}. {Data.Department}</p>
            </div>
            <div className="w-1/12">
            <UserPen onClick={()=>onEdit(Data.ID)} className="cursor-pointer" />
            </div>
            <div className="w-1/12">
            <Trash2 onClick={()=>onDelete(Data.ID)} className="cursor-pointer" />
            </div>
        </div>
    );
}
export default CourseElement;