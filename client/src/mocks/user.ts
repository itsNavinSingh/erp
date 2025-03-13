export default [
  {
    url: "/api/admin/user",
    method: "get",
    response: () => {
      return {
        Msg: "User details fetched successfully",
        Data: [
          {
            UserID: 1,
            Email: "user1@gmail.com",
            Name: "User 1",
            Role: "Student",
          },
          {
            UserID: 2,
            Email: "user2@gmail.com",
            Name: "User 2",
            Role: "Teacher",
          },
          {
            UserID: 3,
            Email: "user3@gmail.com",
            Name: "User 3",
            Role: "Student",
          },
          {
            UserID: 4,
            Email: "user4@gmail.com",
            Name: "User 4",
            Role: "Teacher",
          },
        ],
      };
    },
  },
  {
    url: "/api/admin/user",
    method: "post",
    response: ({
      body,
    }: {
      body: { Name: string; Email: string; Role: string };
    }) => {
      const { Name, Email, Role } = body;
      return {
        Msg: "User Created successfully",
        Data: {
          UserID: 5,
          Name: Name,
          Email: Email,
          Role: Role,
        },
      };
    },
  },
  {
    url: "/api/admin/user",
    method: "patch",
    response: ({
      body,
    }: {
      body: { UserID: number; Name?: string; Email?: string; Role?: string };
    }) => {
      const {
        UserID,
        Name = "default",
        Email = "default",
        Role = "default",
      } = body;
      return {
        Msg: "User Data Edited successfully",
        Data: {
          UserID: UserID,
          Name: Name,
          Email: Email,
          Role: Role,
        },
      };
    },
  },
  {
    url: "/api/admin/user",
    method: "delete",
    response: ({ body }: { body: { UserID: number } }) => {
      const { UserID } = body;
      return {
        Msg: "User Deleted successfully",
        Data: {
          UserID: UserID,
          Name: "Deleted Name",
          Email: "Deleted Email",
          Role: "Student",
        },
      };
    },
  },
];
