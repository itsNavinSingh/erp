export type StudentPaperData = {
  ID: number;
  StudentID: number;
  Student: string;
  PaperID: number;
  Paper: string;
};

export type GetStdPepResponse = {
  Msg: string;
  Data: StudentPaperData[];
};

export type BasicStdPepResponse = {
  Msg: string;
  Data: StudentPaperData;
};

export const defaultStdPep: () => StudentPaperData = () => {
  return {
    ID: 0,
    StudentID: 0,
    Student: "",
    PaperID: 0,
    Paper: "",
  };
};
