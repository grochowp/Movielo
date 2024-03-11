import { sendRequest } from "../utils";

export const AchievementsService = {
  getAchievements: async (
    type: string,
    display: string,
    userAchievements?: Array<string>
  ) => {
    const url = "http://localhost:3000/api/achievement/getAchievements";
    const method = "POST";
    const body = { type, display, userAchievements };

    return await sendRequest(url, method, body);
  },
  assignAchievement: async (userId: string, name: string) => {
    const url = "http://localhost:3000/api/achievement/assignAchievement";
    const method = "POST";
    const body = { userId, name };
    return await sendRequest(url, method, body);
  },
};
