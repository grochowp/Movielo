import { URL_HOST } from "../../public/utils";
import { sendRequest } from "./crudService";

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

    return await sendRequest(url, "GET");
  },
  assignAchievement: async (userId: string, name: string) => {
    const url = `${URL_HOST}/api/achievement/assignAchievement`;
    const body = { userId, name };
    return await sendRequest(url, "POST", body);
  },
};
