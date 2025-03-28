export type ClassData = {
  ID: number;
  PaperID: number;
  Paper: string;
  Type: string;
  TeacherID: number;
  Teacher: string;
};
export const defaultClass: () => ClassData = () => {
  return {
    ID: 0,
    PaperID: 0,
    Paper: "",
    Type: "",
    TeacherID: 0,
    Teacher: "",
  };
};

export type GetClassResponse = {
  Msg: string;
  Data: ClassData[];
};
export type BasicClassResponse = {
  Msg: string;
  Data: ClassData;
};
