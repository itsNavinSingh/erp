import { MockMethod } from "vite-plugin-mock";

type Department = {
    ID: number;
    Name: string;
};
const getDepartment: Department[] = [
    {
        ID: 1,
        Name: "Statistics",
    },
    {
        ID: 2,
        Name: "Mathematics",
    },
    {
        ID: 3,
        Name: "Computer Science",
    },
    {
        ID: 4,
        Name: "Microbiology",
    },
    {
        ID: 5,
        Name: "Economics",
    },
    {
        ID: 6,
        Name: "Political Science",
    },{
        ID: 7,
        Name: "Hindi"
    },{
        ID: 8,
        Name: "Commerce"
    }
];
export default [
    {
        url: "/api/admin/department",
        method: "get",
        response: () => {
            return {
                Msg: "Department data fetched successfully",
                Data: getDepartment,
            };
        }
    },
    {
        url: "/api/admin/department",
        method: "post",
        response: ({body}: {body: {Name: string}}) => {
            const {Name} = body;
            return {
                Msg: "Department added successfully",
                Data: {
                    ID: Math.floor(Math.random()*(100-9)) + 9,
                    Name: Name,
                }
            };
        }
    },{
        url: "/api/admin/department",
        method: "patch",
        response: ({body}: {body: {ID: number; Name: string}}) => {
            return {
                Msg: "Department edited successfully",
                Data: {
                    ID: body.ID,
                    Name: body.Name,
                },
            }
        },
    },
    {
        url: "/api/admin/department",
        method: "delete",
        response: ({body}: {body: {ID: number; Name?: string}}) => {
            const {ID, Name = "Something Something"} = body;
            return {
                Msg: "Department deleted successfully",
                Data: {
                    ID: ID,
                    Name: Name
                },
            };
        }
    }
] as MockMethod[];