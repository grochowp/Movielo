import { sendRequestPOST, sendRequestGET } from "../utils";

export const AchievementsService = {
  getAchievements: async (
    type: string,
    display: string,
    userAchievements?: Array<string>
  ) => {
    let url = `http://localhost:3000/api/achievement/getAchievements?type=${type}&display=${display}`;
    if (userAchievements) {
      const userAchievementsString = userAchievements.join(",");
      url += `&userAchievements=${userAchievementsString}`;
    }

    return await sendRequestGET(url);
  },
  assignAchievement: async (userId: string, name: string) => {
    const url = "http://localhost:3000/api/achievement/assignAchievement";
    const body = { userId, name };
    return await sendRequestPOST(url, body);
  },
};
