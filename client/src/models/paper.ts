export type PaperData = {
  ID: number;
  Name: string;
  UPC: number;
  Semister: number;
  DepartmentID: number;
  Department: string;
  Type: string;
  CreditL: number;
  CreditT: number;
  CreditP: number;
  Syllabus: string;
};
export const defaultPaper: () => PaperData = () => {
  return {
    ID: 0,
    Name: "",
    UPC: 0,
    Semister: 0,
    DepartmentID: 0,
    Department: "",
    Type: "",
    CreditL: 0,
    CreditP: 0,
    CreditT: 0,
    Syllabus: "",
  };
};
export type GetPaperResponse = {
  Msg: string;
  Data: PaperData[];
};

export type BasicPaperResponse = {
  Msg: string;
  Data: PaperData;
};
