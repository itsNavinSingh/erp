export type TimetableData = {
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

export const defaultTimetable: () => TimetableData = () => {
  return {
    ID: 0,
    ClassID: 0,
    PaperID: 0,
    Paper: "",
    TeacherID: 0,
    Teacher: "",
    ClassType: "",
    Day: 0,
    Location: "",
    Start: "",
  };
};

export type GetTimetableResponse = {
  Msg: string;
  Data: TimetableData[];
};

export type BasicTimetableResponse = {
  Msg: string;
  Data: TimetableData;
};
