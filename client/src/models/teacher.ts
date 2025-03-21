export type TeacherData = {
    ID: number;
    UserID: number;
    Email: string;
    Prefix: string;
    Name: string;
    Phone: number;
    DepartmentID: number;
    Department: string;
};
export const defaultTeacher: () => TeacherData = () => {
    return {
        ID: 0,
        UserID: 0,
        Email: "",
        Prefix: "",
        Name: "",
        Phone: 0,
        DepartmentID: 0,
        Department: "",
    };
};

export type GetTeacherResponse = {
    Msg: string;
    Data: TeacherData[];
};

export type BasicTeacherResponse = {
    Msg: string;
    Data: TeacherData;
};