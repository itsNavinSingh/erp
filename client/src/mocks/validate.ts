export default [
  {
    url: "/validate",
    method: "get",
    response: () => {
      return {
        Msg: "Welcome",
        Role: "Admin",
      };
    },
  },
];
