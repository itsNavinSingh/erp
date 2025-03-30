import { MockMethod } from "vite-plugin-mock";

type Timetable = {
  ID: number;
  ClassID: number;
  PaperID: number;
  Paper: string;
  TeacherID: number;
  Teacher: string;
  ClassType: string;
  Day: number;
  Location: string;
  Start: string;
};

const defaultTimetable: (data: {
  ID?: number;
  ClassID?: number;
  PaperID?: number;
  Paper?: string;
  TeacherID?: number;
  Teacher?: string;
  ClassType?: string;
  Day?: number;
  Location?: string;
  Start?: string;
}) => Timetable = ({
  ID = Math.floor(Math.random() * (100 - 8)) + 8,
  ClassID = 1,
  PaperID = 1,
  Paper = "Introduction to Parallel Computing",
  TeacherID = 1,
  Teacher = "Boby Deol",
  ClassType = "L",
  Day = 1,
  Location = "13",
  Start = new Date(2025, 3, 30, 9).toISOString(),
}) => {
  return {
    ID: ID,
    ClassID: ClassID,
    PaperID: PaperID,
    Paper: Paper,
    TeacherID: TeacherID,
    Teacher: Teacher,
    ClassType: ClassType,
    Day: Day,
    Location: Location,
    Start: Start,
  };
};

const getTimetable: Timetable[] = [
  {
    ID: 1,
    ClassID: 1,
    PaperID: 1,
    Paper: "Introduction to Parallel Computing",
    TeacherID: 1,
    Teacher: "Boby Deol",
    ClassType: "L",
    Day: 1,
    Location: "11",
    Start: new Date(2025, 3, 30, 9).toISOString(),
  },
  {
    ID: 2,
    ClassID: 2,
    PaperID: 1,
    Paper: "Introduction to Parallel Computing",
    TeacherID: 1,
    Teacher: "Boby Deol",
    ClassType: "P",
    Day: 1,
    Location: "PC1",
    Start: new Date(2025, 3, 30, 10).toISOString(),
  },
  {
    ID: 3,
    ClassID: 2,
    PaperID: 1,
    Paper: "Introduction to Parallel Computing",
    TeacherID: 1,
    Teacher: "Boby Deol",
    ClassType: "P",
    Day: 1,
    Location: "PC1",
    Start: new Date(2025, 3, 30, 11).toISOString(),
  },
  {
    ID: 4,
    ClassID: 3,
    PaperID: 2,
    Paper: "Artificial Intellegence",
    ClassType: "L",
    TeacherID: 2,
    Teacher: "Sunny Deol",
    Day: 2,
    Location: "21",
    Start: new Date(2025, 3, 30, 9).toISOString(),
  },
];

export default [
  {
    url: "/api/admin/timetable",
    method: "get",
    response: () => {
      return {
        Msg: "Timetable data fetched successfully",
        Data: getTimetable,
      };
    },
  },
  {
    url: "/api/admin/timetable",
    method: "post",
    response: ({
      body,
    }: {
      body: { ClassID: number; Day: number; Location: string; Start: string };
    }) => {
      return {
        Msg: "Timetable added successfully",
        Data: defaultTimetable({
          ClassID: body.ClassID,
          Day: body.Day,
          Location: body.Location,
          Start: body.Start,
        }),
      };
    },
  },
  {
    url: "/api/admin/timetable",
    method: "delete",
    response: ({ body }: { body: { ID: number } }) => {
      return {
        Msg: "Timetable deleted successfully",
        Data: defaultTimetable({ ID: body.ID }),
      };
    },
  },
  {
    url: "/api/admin/timetable",
    method: "patch",
    response: ({
      body,
    }: {
      body: {
        ID: number;
        ClassID?: number;
        Day?: number;
        Location?: string;
        Start?: string;
      };
    }) => {
      return {
        Msg: "Changes saved successfully",
        Data: defaultTimetable({
          ID: body.ID,
          ClassID: body.ClassID,
          Day: body.Day,
          Location: body.Location,
          Start: body.Start,
        }),
      };
    },
  },
] as MockMethod[];
