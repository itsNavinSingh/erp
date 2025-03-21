import { TeacherData } from "../models/teacher";

interface TeacherElemProp {
    Data: TeacherData;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    className?: string;
}
const TeacherElement: React.FC<TeacherElemProp> = ({Data, onEdit, onDelete, className=""}: TeacherElemProp) => {
    return (
        <div className={`w-full p-2 px-4 shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}>
            // to do
        </div>
    );
}
export default TeacherElement;