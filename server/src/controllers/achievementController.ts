import { Request, Response, NextFunction } from "express";
const Achievements = require("../models/achievementModel");
const User4 = require("../models/userModel");

module.exports.getAchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    let achievements;
    if (type === "All") achievements = await Achievements.find();
    else
      achievements = await Achievements.find({
        $or: [{ type }, { type: "Combined" }],
      });

    return res.json({ status: true, achievements });
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
    console.log(achievement);
    const user = await User4.findByIdAndUpdate(
      userId,
      {
        $push: { achievements: name },
        $inc: { points: achievement.points },
      },
      { new: true }
    );

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
