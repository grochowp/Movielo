import { sendRequest } from "../utils";

export const AchievementsService = {
  getAchievements: async (type: string) => {
    const url = "http://localhost:3000/api/achievement/getAchievements";
    const method = "POST";
    const body = { type };

    return await sendRequest(url, method, body);
  },
};
