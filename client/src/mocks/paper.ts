type Paper = {
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
const defaultPaper: (data: {
  ID?: number;
  Name?: string;
  UPC?: number;
  Semister?: number;
  DepartmentID?: number;
  Department?: string;
  Type?: string;
  CreditL?: number;
  CreditP?: number;
  CreditT?: number;
  Syllabus?: string;
}) => Paper = ({
  ID = Math.floor(Math.random() * (100 - 8)) + 8,
  Name = "Default Paper",
  UPC = 1102553355,
  Semister = 1,
  DepartmentID = 1,
  Department = "Statistics",
  Type = "Core",
  CreditL = 3,
  CreditP = 1,
  CreditT = 0,
  Syllabus = "",
}) => {
  return {
    ID: ID,
    Name: Name,
    UPC: UPC,
    Semister: Semister,
    DepartmentID: DepartmentID,
    Department: Department,
    Type: Type,
    CreditL: CreditL,
    CreditP: CreditP,
    CreditT: CreditT,
    Syllabus: Syllabus,
  };
};
const getPapers: Paper[] = [
  {
    ID: 1,
    Name: "Introduction to Parallel Computing",
    UPC: 1100110001,
    Semister: 6,
    DepartmentID: 3,
    Department: "Computer Science",
    Type: "DSC",
    CreditL: 3,
    CreditP: 1,
    CreditT: 0,
    Syllabus: ""
  },
  {
    ID: 2,
    Name: "Artificial Intellegence",
    UPC: 2553255311,
    Semister: 6,
    DepartmentID: 3,
    Department: "Computer Science",
    Type: "DSC",
    CreditT: 0,
    CreditL: 3,
    CreditP: 1,
    Syllabus: ""
  },
  {
    ID: 3,
    Name: "Machine Learning",
    UPC: 5325532511,
    Semister: 6,
    DepartmentID: 3,
    Department: "Computer Science",
    Type: "DSC",
    CreditL: 3,
    CreditP: 1,
    CreditT: 0,
    Syllabus: ""
  },
  {
    ID: 4,
    Name: "Ethical Hacking",
    UPC: 1102553255,
    Semister: 6,
    DepartmentID: 3,
    Department: "Computer Science",
    Type: "DSE",
    CreditL: 3,
    CreditP: 1,
    CreditT: 0,
    Syllabus: ""
  },
  {
    ID: 5,
    Name: "Survey Sampling and DOE",
    UPC: 6969696969,
    Semister: 6,
    DepartmentID: 1,
    Department: "Statistics",
    Type: "GE",
    CreditL: 3,
    CreditP: 1,
    CreditT: 0,
    Syllabus: ""
  },
  {
    ID: 6,
    Name: "Introduction to Blockchain",
    UPC: 9696969696,
    Semister: 4,
    DepartmentID: 3,
    Department: "Computer Science",
    Type: "SEC",
    CreditL: 0,
    CreditP: 2,
    CreditT: 0,
    Syllabus: ""
  }
];
export default [
  {
    url: "/api/admin/paper",
    method: "get",
    response: () => {
      return {
        Msg: "Paper data fetched successfully",
        Data: getPapers,
      };
    },
  },
  {
    url: "/api/admin/paper",
    method: "post",
    response: ({
      body,
    }: {
      body: {
        Name: string;
        UPC: number;
        Semister: number;
        DepartmentID: number;
        Type: string;
        CreditL: number;
        CreditP: number;
        CreditT: number;
        Syllabus: string;
      };
    }) => {
      const {
        Name,
        UPC,
        Semister,
        DepartmentID,
        Type,
        CreditL,
        CreditP,
        CreditT,
        Syllabus,
      } = body;
      return {
        Msg: "Paper added successfully",
        Data: defaultPaper({
          Name: Name,
          UPC: UPC,
          Semister: Semister,
          DepartmentID: DepartmentID,
          Type: Type,
          CreditL: CreditL,
          CreditP: CreditP,
          CreditT: CreditT,
          Syllabus: Syllabus,
        }),
      };
    },
  },
  {
    url: "/api/admin/paper",
    method: "patch",
    response: ({
      body,
    }: {
      body: {
        ID: number;
        Name?: string;
        UPC?: number;
        Semister?: number;
        DepartmentID?: number;
        Type?: string;
        CreditL?: number;
        CreditP?: number;
        CreditT?: number;
        Syllabus?: string;
      };
    }) => {
      return {
        Msg: "Paper data saved successfully",
        Data: defaultPaper({
          ID: body.ID,
          Name: body.Name,
          UPC: body.UPC,
          Semister: body.Semister,
          DepartmentID: body.DepartmentID,
          Type: body.Type,
          CreditL: body.CreditL,
          CreditP: body.CreditP,
          CreditT: body.CreditT,
          Syllabus: body.Syllabus,
        }),
      };
    },
  },
  {
    url: "/api/admin/paper",
    method: "delete",
    response: ({ body }: { body: { ID: number } }) => {
      return {
        Msg: "Paper deleted successfully",
        Data: defaultPaper({ ID: body.ID }),
      };
    },
  },
];
