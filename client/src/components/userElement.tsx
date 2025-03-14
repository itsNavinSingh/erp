import { Trash2, UserPen } from "lucide-react";

interface UserElementProp {
    UserID: number;
    Name: string;
    Email: string;
    Role: string;
    onEdit: (userId: number) => void;
    onDelete: (userId: number) => void;
    className?: string;
}
const UserElement: React.FC<UserElementProp> = ({UserID, Name, Email, Role, onEdit, onDelete, className=""}:UserElementProp) => {
    return (
        <div className={`w-full p-2 px-4 flex shadow-lg rounded-lg bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-100 ${className}`}>
            <div className="w-1/12">
                <p className="text-lg font-semibold">{UserID}</p>
            </div>
            <div className="flex-1/2">
                <p className="text-lg font-semibold">{Name}</p>
            </div>
            <div className="flex-1/2">
                <p className="italic font-medium">{Email}</p>
            </div>
            <div className="w-3/12">
                <p className="text-lg font-semibold">{Role}</p>
            </div>
            <div className="w-1/12">
                <UserPen onClick={() => onEdit(UserID)} className="cursor-pointer" />
            </div>
            <div className="w-1/12">
                <Trash2 onClick={() => onDelete(UserID)} className="cursor-pointer" />
            </div>
        </div>
    );
}
export default UserElement;