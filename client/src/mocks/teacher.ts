type Teacher = {
  ID: number;
  UserID: number;
  Email: string;
  Prefix: string;
  Name: string;
  Phone: number;
  DepartmentID: number;
  Department: string;
};
const GetTeacher: Teacher[] = [
  {
    ID: 1,
    UserID: 2,
    Email: "boby@gmail.com",
    Prefix: "Mr",
    Name: "Boby Deol",
    Phone: 1125532553,
    DepartmentID: 1,
    Department: "Statistics",
  },
  {
    ID: 2,
    UserID: 5,
    Email: "sunny@gmail.com",
    Prefix: "Prof",
    Name: "Sunny Deol",
    Phone: 1102553255,
    DepartmentID: 2,
    Department: "Mathematics",
  },
  {
    ID: 3,
    UserID: 6,
    Email: "hema@gmail.com",
    Prefix: "Mrs",
    Name: "Hema Malini",
    Phone: 2553255301,
    DepartmentID: 5,
    Department: "Economics",
  },
  {
    ID: 4,
    UserID: 8,
    Email: "ajay@gmail.com",
    Prefix: "Mr",
    Name: "Ajay Devgun",
    Phone: 2553255311,
    DepartmentID: 1,
    Department: "Statistics",
  },
];
const defaultTeacher: (data: {
  ID?: number;
  UserID?: number;
  Email?: string;
  Prefix?: string;
  Name?: string;
  Phone?: number;
  DepartmentID?: number;
  Department?: string;
}) => Teacher = ({
  ID = Math.floor(Math.random() * (100 - 5)) + 5,
  UserID = Math.floor(Math.random() * (100 - 10)) + 10,
  Email = "default@gmail.com",
  Prefix = "Prof",
  Name = "Default Kumar",
  Phone = 1102553255,
  DepartmentID = 1,
  Department = "Statistics",
}) => {
  return {
    ID: ID,
    UserID: UserID,
    Email: Email,
    Prefix: Prefix,
    Name: Name,
    Phone: Phone,
    DepartmentID: DepartmentID,
    Department: Department,
  };
};
export default [
  {
    url: "/api/admin/teacher",
    method: "get",
    response: () => {
      return {
        Msg: "Teacher data fetched successfully",
        Data: GetTeacher,
      };
    },
  },
  {
    url: "/api/admin/teacher",
    method: "post",
    response: ({
      body,
    }: {
      body: {
        UserID: number;
        Prefix: string;
        Phone: number;
        DepartmentID: number;
      };
    }) => {
      const { UserID, Prefix, Phone, DepartmentID } = body;
      return {
        Msg: "Teacher added successfully",
        Data: defaultTeacher({
          UserID: UserID,
          Prefix: Prefix,
          Phone: Phone,
          DepartmentID: DepartmentID,
        }),
      };
    },
  },
  {
    url: "/api/admin/teacher",
    method: "patch",
    response: ({
      body,
    }: {
      body: {
        ID: number;
        UserID?: number;
        Prefix?: string;
        Phone?: number;
        DepartmentID?: number;
      };
    }) => {
      const { ID, UserID = Math.floor(Math.random() * (100-10)) + 10, Prefix= "Prof", Phone=1102553255, DepartmentID=1 } = body;
      return {
        Msg: "Changes Saved successfully",
        Data: defaultTeacher({ID: ID, UserID: UserID, Prefix: Prefix, Phone: Phone, DepartmentID: DepartmentID}),
      };
    },
  },
  {
    url: "/api/admin/teacher",
    method: "delete",
    response: ({body}: {body: {ID: number;}}) => {
        return {
            Msg: "Teacher deleted successfully",
            Data: defaultTeacher({ID: body.ID}),
        };
    }
  }
];
