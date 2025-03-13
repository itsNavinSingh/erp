import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type User = {
    UserID: number;
    Name: string;
    Email: string;
    Role: string;
}
type GetUserResponse = {
    Msg: string;
    Data: User[];
}
type ErrorResponse = {
    Msg: string;
}
const UserPage: React.FC = () => {
    const [userdata, setuserdata] = useState<User[]>([]);

    const getUserData: () => void =  async () => {
        try {
            const response = await axios.get<GetUserResponse, AxiosResponse<GetUserResponse, ErrorResponse>>("/api/admin/user", {
                withCredentials: true,
            });
            if(response.status === 200) {
                setuserdata(response.data.Data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // error.response?.data
            } else {
                // error
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="p-4 w-full h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            {userdata.map((data) => (<p key={data.UserID}>{`${data.UserID} ${data.Name} ${data.Email} ${data.Role}`}</p>))}
        </div>
    );
}
export default UserPage;