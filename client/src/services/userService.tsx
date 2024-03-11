import { sendRequest } from "../utils";

export const userService = {
  login: async (email: string, password: string) => {
    const url = "http://localhost:3000/api/profile/login";
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
    const url = "http://localhost:3000/api/profile/register";
    const method = "POST";
    const body = { email, password, firstName, lastName };
    return await sendRequest(url, method, body);
  },

  editProfile: async (firstName: string, lastName: string, userId: string) => {
    const url = "http://localhost:3000/api/profile/editProfile";
    const method = "POST";
    const body = { firstName, lastName, userId };
    return await sendRequest(url, method, body);
  },
};
