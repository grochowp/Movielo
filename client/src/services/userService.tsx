import { sendRequestPOST, sendRequestPUT } from "../utils";

export const userService = {
  login: async (email: string, password: string) => {
    const url = "http://localhost:3000/api/profile/login";
    const body = { email, password };

    return await sendRequestPOST(url, body);
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
    const body = { email, password, firstName, lastName };
    return await sendRequestPOST(url, body);
  },

  editProfile: async (firstName: string, lastName: string, userId: string) => {
    const url = `http://localhost:3000/api/profile/editProfile/${userId}`;
    const body = { firstName, lastName };
    return await sendRequestPUT(url, body);
  },
};
