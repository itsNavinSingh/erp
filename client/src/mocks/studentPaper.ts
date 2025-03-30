import { MockMethod } from "vite-plugin-mock";

type StudentPaper = {
  ID: number;
  StudentID: number;
  Student: string;
  PaperID: number;
  Paper: string;
};

const defaultStudentPaper: (data: {
  ID?: number;
  StudentID?: number;
  Student?: string;
  PaperID?: number;
  Paper?: string;
}) => StudentPaper = ({
  ID = Math.floor(Math.random() * (100 - 8)) + 8,
  PaperID = 1,
  Paper = "Introduction to Parallel Computing",
  StudentID = 1,
  Student = "Test Kumar",
}) => {
  return {
    ID: ID,
    StudentID: StudentID,
    Student: Student,
    PaperID: PaperID,
    Paper: Paper,
  };
};

const getStudentPaper: StudentPaper[] = [
  {
    ID: 1,
    StudentID: 1,
    Student: "Test Kumar",
    PaperID: 1,
    Paper: "Introduction to Parallel Computing",
  },
  {
    ID: 2,
    StudentID: 1,
    Student: "Test Kumar",
    PaperID: 2,
    Paper: "Artificial Intellegence",
  },
  {
    ID: 3,
    StudentID: 1,
    Student: "Test Kumar",
    PaperID: 3,
    Paper: "Machine Learning",
  },
  {
    ID: 4,
    StudentID: 2,
    Student: "Btest Ji",
    PaperID: 3,
    Paper: "Machine Learning",
  },
  {
    ID: 5,
    StudentID: 2,
    Student: "Btest Ji",
    PaperID: 4,
    Paper: "Ethical Hacking",
  },
  {
    ID: 6,
    StudentID: 2,
    Student: "Btest Ji",
    PaperID: 5,
    Paper: "Survey Sampling and DOE",
  },
  {
    ID: 7,
    StudentID: 3,
    Student: "Mr Bihari",
    PaperID: 6,
    Paper: "Introduction to Blockchain",
  },
];

export default [
  {
    url: "/api/admin/studentPaper",
    method: "get",
    response: () => {
      return {
        Msg: "Student Paper fetched successfully",
        Data: getStudentPaper,
      };
    },
  },
  {
    url: "/api/admin/studentPaper",
    method: "post",
    response: ({
      body,
    }: {
      body: { StudentID?: number; PaperID?: number };
    }) => {
      return {
        Msg: "Student Paper data added successfully",
        Data: defaultStudentPaper({
          PaperID: body.PaperID,
          StudentID: body.StudentID,
        }),
      };
    },
  },
  {
    url: "/api/admin/studentPaper",
    method: "delete",
    response: ({ body }: { body: { ID: number } }) => {
      return {
        Msg: "Student Paper deleted successfully",
        Data: defaultStudentPaper({ ID: body.ID }),
      };
    },
  },
  {
    url: "/api/admin/studentPaper",
    method: "patch",
    response: ({
      body,
    }: {
      body: { ID: number; StudentID: number; PaperID: number };
    }) => {
      return {
        Msg: "Changes saved successfully",
        Data: defaultStudentPaper({
          ID: body.ID,
          StudentID: body.StudentID,
          PaperID: body.StudentID,
        }),
      };
    },
  },
] as MockMethod[];