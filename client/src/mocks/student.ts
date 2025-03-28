import { MockMethod } from "vite-plugin-mock";

type StudentApi = {
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
const GetStudents: StudentApi[] = [
  {
    ID: 1,
    UserID: 1,
    Name: "Test Kumar",
    Email: "test@gmail.com",
    Dob: new Date(2004, 7, 27).toISOString(),
    Phone: 1102553552,
    EnrollmentYear: 2022,
    Semister: 6,
    CourseID: 1,
    Course: "B. Sc. Statistics",
  },
  {
    ID: 2,
    UserID: 5,
    Name: "Btest Ji",
    Email: "btest@gmail.com",
    Dob: new Date(2003, 4, 21).toISOString(),
    Phone: 2553012553,
    EnrollmentYear: 2022,
    Semister: 6,
    CourseID: 2,
    Course: "B. Sc. Mathematics",
  },
  {
    ID: 3,
    UserID: 11,
    Name: "Mr Bihari",
    Email: "hello@bihari.com",
    Dob: new Date(2006, 1, 15).toISOString(),
    Phone: 5353025251,
    EnrollmentYear: 2023,
    Semister: 4,
    CourseID: 3,
    Course: "B. Sc. Unemployment",
  },
  {
    ID: 4,
    UserID: 23,
    Name: "Jhat Paglu",
    Email: "raamraam@bhai.com",
    Dob: new Date(2005, 11, 6).toISOString(),
    Phone: 1153532525,
    EnrollmentYear: 2023,
    Semister: 6,
    CourseID: 4,
    Course: "B. A. Physical Educaton",
  },
  {
    ID: 5,
    UserID: 26,
    Name: "Neeraj Pepsu",
    Email: "neeraj@dil.me",
    Dob: new Date(2006, 4, 3).toISOString(),
    Phone: 1843566719,
    EnrollmentYear: 2024,
    Semister: 2,
    CourseID: 4,
    Course: "B. A. Physical Education",
  },
  {
    ID: 6,
    UserID: 75,
    Name: "Samai Raina",
    Email: "samai@jail.in",
    Dob: new Date(2007, 6, 3).toISOString(),
    Phone: 4592713201,
    EnrollmentYear: 2024,
    Semister: 2,
    CourseID: 5,
    Course: "B. Com. Comedy",
  },
];
export default [
  {
    url: "/api/admin/student",
    method: "get",
    response: () => {
      return {
        Msg: "Student Data fetched Successfully",
        Data: GetStudents,
      };
    },
  },
  {
    url: "/api/admin/student",
    method: "post",
    response: ({
      body,
    }: {
      body: { UserID: number; Dob: string; Phone: number; EnrollmentYear: number; Semister: number; CourseID: number };
    }) => {
        const {UserID, Dob, Phone, EnrollmentYear, Semister, CourseID} = body;
      return {
        Msg: "Student Created Successfully",
        Data: {
            ID: Math.floor(Math.random()*(100 - 7)) + 7,
            UserID: UserID,
            Name: "Something Some",
            Email: "some@something.com",
            Dob: Dob,
            Phone: Phone,
            EnrollmentYear: EnrollmentYear,
            Semister: Semister,
            CourseID: CourseID,
            Course: "B. A. Something"
        },
      };
    },
  },
  {
    url: "/api/admin/student",
    method: "patch",
    response: ({
      body,
    }: {
      body: { ID: number; UserID?: number; Dob?: string; Phone?: number; EnrollmentYear?: number; Semister?: number; CourseID?: number };
    }) => {
        const {ID, UserID = Math.floor(Math.random()*(100 - 7)) + 7, Dob = new Date(2007, 8, 2).toISOString(), Phone = 9901125253, EnrollmentYear = 2024, Semister = 2, CourseID = 5} = body;
      return {
        Msg: "Student Created Successfully",
        Data: {
            ID: ID,
            UserID: UserID,
            Name: "Something Some",
            Email: "some@something.com",
            Dob: Dob,
            Phone: Phone,
            EnrollmentYear: EnrollmentYear,
            Semister: Semister,
            CourseID: CourseID,
            Course: "B. A. Something"
        },
      };
    },
  },
  {
    url: "/api/admin/student",
    method: "delete",
    response: ({
      body,
    }: {
      body: { ID: number; UserID?: number; Dob?: string; Phone?: number; EnrollmentYear?: number; Semister?: number; CourseID?: number };
    }) => {
        const {ID, UserID = Math.floor(Math.random()*(100 - 7)) + 7, Dob = new Date(2007, 8, 2).toISOString(), Phone = 9901125253, EnrollmentYear = 2024, Semister = 2, CourseID = 5} = body;
      return {
        Msg: "Student Deleted Successfully",
        Data: {
            ID: ID,
            UserID: UserID,
            Name: "Something Some",
            Email: "some@something.com",
            Dob: Dob,
            Phone: Phone,
            EnrollmentYear: EnrollmentYear,
            Semister: Semister,
            CourseID: CourseID,
            Course: "B. A. Something"
        },
      };
    },
  },
] as MockMethod[];
