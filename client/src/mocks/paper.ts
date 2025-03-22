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
const getPapers: Paper[] = [];
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
