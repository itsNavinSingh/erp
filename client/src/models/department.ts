export type DepartmentData = {
  ID: number;
  Name: string;
};

export type GetDepartmentResponse = {
  Msg: string;
  Data: DepartmentData[];
};

export type BasicDepartmentResponse = {
  Msg: string;
  Data: DepartmentData;
};
