export type CourseData = {
  ID: number;
  Name: string;
  DepartmentID: number;
  Department: string;
};
export type GetCourseResponse = {
  Msg: string;
  Data: CourseData[];
};
export type BasicCourseResponse = {
  Msg: string;
  Data: CourseData;
};
