import { URL_HOST } from "../utils";
import { sendRequestPOST, sendRequestPUT } from "./crudService";

export const userService = {
  login: async (email: string, password: string) => {
    const url = `${URL_HOST}/api/profile/login`;
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
    const url = `${URL_HOST}/api/profile/register`;
    const body = { email, password, firstName, lastName };
    return await sendRequestPOST(url, body);
  },

  editProfile: async (firstName: string, lastName: string, userId: string) => {
    const url = `${URL_HOST}/api/profile/editProfile/${userId}`;
    const body = { firstName, lastName };
    return await sendRequestPUT(url, body);
  },

  changeProfilePicture: async (file: File, userId?: string) => {
    const url = `${URL_HOST}/api/profile/changeProfilePicture/${userId}`;
    const body = { file };
    return await sendRequestPUT(url, body);
  },
};
