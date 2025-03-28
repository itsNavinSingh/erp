import { MockMethod } from "vite-plugin-mock";

type Class = {
  ID: number;
  PaperID: number;
  Paper: string;
  Type: string;
  TeacherID: number;
  Teacher: string;
};
const defaultClass: (data: {
  ID?: number;
  PaperID?: number;
  Paper?: string;
  Type?: string;
  TeacherID?: number;
  Teacher?: string;
}) => Class = ({
  ID = Math.floor(Math.random() * (100 - 8)) + 8,
  PaperID = 1,
  Paper = "Introduction to Parallel Computing",
  Type = "L",
  TeacherID = 1,
  Teacher = "Boby Deol",
}) => {
  return {
    ID: ID,
    PaperID: PaperID,
    Paper: Paper,
    Type: Type,
    TeacherID: TeacherID,
    Teacher: Teacher,
  };
};
const getClass: Class[] = [
  {
    ID: 1,
    PaperID: 1,
    Paper: "Introduction to Parallel Commputing",
    Type: "L",
    TeacherID: 1,
    Teacher: "Boby Deol",
  },
  {
    ID: 2,
    PaperID: 1,
    Paper: "Introduction to Parallel Computing",
    Type: "P",
    TeacherID: 1,
    Teacher: "Boby Deol",
  },
  {
    ID: 3,
    PaperID: 2,
    Paper: "Artificial Intellegence",
    Type: "L",
    TeacherID: 2,
    Teacher: "Sunny Deol",
  },
  {
    ID: 4,
    PaperID: 2,
    Paper: "Artificial Intellegence",
    Type: "P",
    TeacherID: 2,
    Teacher: "Sunny Deol",
  },
  {
    ID: 5,
    PaperID: 3,
    Paper: "Machine Learning",
    Type: "L",
    TeacherID: 2,
    Teacher: "Sunny Deol",
  },
  {
    ID: 6,
    PaperID: 3,
    Paper: "Machine Learning",
    Type: "P",
    TeacherID: 3,
    Teacher: "Hema Malini",
  },
];

export default [
  {
    url: "/api/admin/class",
    method: "get",
    response: () => {
      return {
        Msg: "Class data fetched successfully",
        Data: getClass,
      };
    },
  },
  {
    url: "/api/admin/class",
    method: "post",
    response: ({
      body,
    }: {
      body: { PaperID: number; Type: string; TeacherID: number };
    }) => {
      return {
        Msg: "Class added successfully",
        Data: defaultClass({
          PaperID: body.PaperID,
          Type: body.Type,
          TeacherID: body.TeacherID,
        }),
      };
    },
  },
  {
    url: "/api/admin/class",
    method: "delete",
    response: ({ body }: { body: { ID: number } }) => {
      return {
        Msg: "Class deleted successfully",
        Data: defaultClass({ ID: body.ID }),
      };
    },
  },
  {
    url: "/api/admin/class",
    method: "patch",
    response: ({ body }: {body: {ID: number; PaperID?: number; Type?: string; TeacherID?: number}}) => {
      return {
        Msg: "Changes saved successfully",
        Data: defaultClass({ID: body.ID, PaperID: body.PaperID, Type: body.Type, TeacherID: body.TeacherID}),
      }
    },
  },
] as MockMethod[];
