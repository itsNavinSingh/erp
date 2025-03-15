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
];
