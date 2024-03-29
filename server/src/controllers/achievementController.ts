import { Request, Response, NextFunction } from "express";
const Achievements = require("../models/achievementModel");
const User = require("../models/userModel");

interface IAchievement {
  name: string;
  tier: number;
  type: string;
  points: number;
  text: string;
}
module.exports.getAchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, display, userAchievements } = req.query;

    const userAchievementsArray =
      typeof userAchievements === "string" ? userAchievements.split(",") : [];

    let achievements;
    if (type === "All") {
      achievements = await Achievements.find();
    } else {
      achievements = await Achievements.find({
        $or: [{ type }, { type: "Combined" }],
      });
    }

    if (display === "All") {
      return res.json({ status: true, achievements });
    }

    if (display === "Completed") {
      const completedAchievements = achievements.filter(
        (achievement: IAchievement) =>
          userAchievementsArray.includes(achievement.name)
      );

      return res.json({ status: true, achievements: completedAchievements });
    } else {
      const unearnedAchievements = achievements.filter(
        (achievement: IAchievement) =>
          !userAchievementsArray.includes(achievement.name)
      );

      return res.json({ status: true, achievements: unearnedAchievements });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.assignAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, name } = req.body;
    const achievement = await Achievements.findOne({ name });
    if (!achievement) {
      return res
        .status(404)
        .json({ status: false, message: "Achievement not found" });
    }
    let user;
    if (achievement.title) {
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            achievements: name,
            titles: { name: achievement?.title, display: false },
          },
          $inc: { points: achievement.points },
        },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            achievements: name,
          },
          $inc: { points: achievement.points },
        },
        { new: true }
      );
    }

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
