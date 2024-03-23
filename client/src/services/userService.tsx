import { URL_HOST } from "../utils";
import { sendRequestGET, sendRequestPOST, sendRequestPUT } from "./crudService";

export const userService = {
  login: async (email: string, password: string) => {
    const url = `${URL_HOST}/api/user/login`;
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
    const url = `${URL_HOST}/api/user/register`;
    const body = { email, password, firstName, lastName };
    return await sendRequestPOST(url, body);
  },

  editProfile: async (firstName: string, lastName: string, userId: string) => {
    const url = `${URL_HOST}/api/user/editProfile/${userId}`;
    const body = { firstName, lastName };
    return await sendRequestPUT(url, body);
  },

  changeProfilePicture: async (userId: string, link: string) => {
    const url = `${URL_HOST}/api/user/changeProfilePicture/${userId}`;
    const body = { link };
    return await sendRequestPUT(url, body);
  },

  findUserRating: async (userId?: string) => {
    const url = `${URL_HOST}/api/user/findUserRating/${userId}`;
    return await sendRequestGET(url);
  },

  changeTitles: async (userId: string, name: string) => {
    const url = `${URL_HOST}/api/user/changeTitles/${userId}`;
    const body = { name };
    return await sendRequestPUT(url, body);
  },
};
