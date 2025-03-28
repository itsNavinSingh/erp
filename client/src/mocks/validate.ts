import { MockMethod } from "vite-plugin-mock";

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
] as MockMethod[];
