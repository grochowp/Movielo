import { URL_HOST } from "../../public/utils";
import { sendRequestPOST, sendRequestGET } from "./crudService";

export const AchievementsService = {
  getAchievements: async (
    type: string,
    display: string,
    userAchievements?: Array<string>
  ) => {
    let url = `${URL_HOST}/api/achievement/getAchievements?type=${type}&display=${display}`;
    if (userAchievements) {
      const userAchievementsString = userAchievements.join(",");
      url += `&userAchievements=${userAchievementsString}`;
    }

    return await sendRequestGET(url);
  },
  assignAchievement: async (userId: string, name: string) => {
    const url = `${URL_HOST}/api/achievement/assignAchievement`;
    const body = { userId, name };
    return await sendRequestPOST(url, body);
  },
};
