import { sendRequest } from "../utils";

export const LoginService = {
  login: async (email: string, password: string) => {
    const url = "http://localhost:3001/api/login";
    const method = "POST";
    const body = { email, password };

    return await sendRequest(url, method, body);
  },
  logout: () => {
    return "";
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const url = "http://localhost:3001/api/register";
    const method = "POST";
    const body = { email, password, firstName, lastName };
    return await sendRequest(url, method, body);
  },
};
