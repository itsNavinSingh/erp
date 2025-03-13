export default [
  {
    url: "/api/admin/me",
    method: "get",
    response: () => {
      return {
        UserID: 1,
        Name: "Jackey Chain",
        Email: "jacky@example.com",
        Role: "Admin",
      };
    },
  },
  {
    url: "/api/teacher/me",
    method: "get",
    response: () => {
      return {
        UserID: 2,
        Name: "Baba Yadav",
        Email: "baba@example.com",
        Role: "Teacher",
      };
    },
  },
  {
    url: "/api/student/me",
    method: "get",
    response: () => {
      return {
        UserID: 3,
        Name: "Russian Virus",
        Email: "russianvirus@gmail.com",
        Role: "Student",
      };
    },
  },
];
