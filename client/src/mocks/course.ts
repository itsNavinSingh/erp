type Course = {
  ID: number;
  Name: string;
  DepartmentID: number;
  Department: string;
};
const getCourse: Course[] = [
  {
    ID: 1,
    Name: "B. Sc. Statistics",
    DepartmentID: 1,
    Department: "Statistics",
  },
  {
    ID: 2,
    Name: "B. Sc. Mathematics",
    DepartmentID: 2,
    Department: "Mathematics",
  },
  {
    ID: 3,
    Name: "B. Sc. Unemployment",
    DepartmentID: 3,
    Department: "Computer Science",
  },
  {
    ID: 4,
    Name: "B. A. Physical Education",
    DepartmentID: 4,
    Department: "Physical Science",
  },
  {
    ID: 5,
    Name: "B. Com. Comedy",
    DepartmentID: 5,
    Department: "Comedy",
  },
];
export default [
  {
    url: "/api/admin/course",
    method: "get",
    response: () => {
      return {
        Msg: "Course data fetched successfully",
        Data: getCourse,
      };
    },
  },
  {
    url: "/api/admin/course",
    method: "post",
    response: ({
      body,
    }: {
      body: { Name: string; DepartmentID: number; Department?: string };
    }) => {
      const { Name, DepartmentID, Department = "Something Something" } = body;
      return {
        Msg: "Course Created successfully",
        Data: {
          ID: Math.floor(Math.random() * (100 - 6)) + 6,
          Name: Name,
          DepartmentID: DepartmentID,
          Department: Department,
        },
      };
    },
  },
  {
    url: "/api/admin/course",
    method: "patch",
    response: ({
      body,
    }: {
      body: {
        ID: number;
        Name?: string;
        DepartmentID?: number;
        Department?: string;
      };
    }) => {
      const {
        ID,
        Name = "Something Something",
        DepartmentID = 1,
        Department = "Something Something",
      } = body;
      return {
        Msg: "Course edited successfully",
        Data: {
          ID: ID,
          Name: Name,
          DepartmentID: DepartmentID,
          Department: Department,
        },
      };
    },
  },
  {
    url: "/api/admin/course",
    method: "delete",
    response: ({
      body,
    }: {
      body: {
        ID: number;
        Name?: string;
        DepartmentID?: number;
        Department?: string;
      };
    }) => {
      const {
        ID,
        Name = "Something Something",
        DepartmentID = 0,
        Department = "Default Dept",
      } = body;
      return {
        Msg: "Course deleted successfully",
        Data: {
          ID: ID,
          Name: Name,
          DepartmentID: DepartmentID,
          Department: Department,
        },
      };
    },
  },
];
