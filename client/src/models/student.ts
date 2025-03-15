export type StudentData = {
  ID: number;
  UserID: number;
  Name: string;
  Email: string;
  Dob: string;
  Phone: number;
  EnrollmentYear: number;
  Semister: number;
  CourseID: number;
  Course: string;
};

export type GetStudentsResponse = {
  Msg: string;
  Data: StudentData[];
};
export type BasicStudentResponse = {
  Msg: string;
  Data: StudentData;
};