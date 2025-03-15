import { Trash2, UserPen } from "lucide-react";
import { StudentData } from "../models/student";

interface StudentElementProp {
  Data: StudentData;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
}
const StudentElement: React.FC<StudentElementProp> = ({
  Data,
  onDelete,
  onEdit,
  className = "",
}: StudentElementProp) => {
  const date = new Date(Data.Dob);
  return (
    <div
      className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 items-center ${className}`}
    >
      <div className="w-1/12">
        <p className="text-lg font-semibold">{Data.ID}.</p>
      </div>
      <div className="flex-1/2">
        <p className="text-lg font-semibold">{Data.Name}</p>
        <p className="italic text-sm text-gray-700 dark:text-gray-300">
          {Data.UserID}. ({Data.Email})
        </p>
      </div>
      <div className="w-3/12">
      <p className="text-sm italic">DOB</p>
        <p className="font-medium text-lg">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
      </div>
      <div className="w-3/12">
      <p className="text-sm italic">Phone</p>
        <p className="text-lg font-medium">{Data.Phone}</p>
      </div>
      <div className="w-2/12">
      <p className=" text-sm italic">Enrollment</p>
        <p className="font-semibold text-lg">{Data.EnrollmentYear}/{Data.Semister}</p>
      </div>
      <div className="flex-1/2">
      <p className="text-sm italic">Course</p>
        <p className="text-lg font-semibold">
          {Data.CourseID}. {Data.Course}
        </p>
      </div>
      <div className="w-1/12">
        <UserPen onClick={() => onEdit(Data.ID)} className="cursor-pointer" />
      </div>
      <div className="w-1/12">
        <Trash2 onClick={() => onDelete(Data.ID)} className="cursor-pointer" />
      </div>
    </div>
  );
};
export default StudentElement;
