const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");

import { Request, Response, NextFunction } from "express";

interface UserRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userId: string;
  };
}

module.exports.login = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        message: "Incorrect Email or Password",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({
        message: "Incorrect Email or Password",
        status: false,
      });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
    if (specialChars.test(firstName) || specialChars.test(lastName)) {
      return res.json({
        message:
          "You can`t use numbers or special symbols for first and last name",
        status: false,
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "Email already used", status: false });
    if (password.length < 8)
      return res.json({
        message: "Password must contain: 8 characters, 1 uppercase, 1 number",
        status: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      firstName:
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName:
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
      password: hashedPassword,
      points: 0,
      titles: [],
      achievements: [],
      profilePicture: "https://i.imgur.com/u5PAw8H.png",
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.editProfile = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName } = req.body;
    const { userId } = req.params;

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
    if (specialChars.test(firstName) || specialChars.test(lastName)) {
      return res.json({ message: "Letters only" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName:
          firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
        lastName:
          lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
      },
      { new: true }
    );
    return res.json({ status: true, user, message: "Profile updated!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.changeProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { link } = req.body;
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: link },
      { new: true }
    );
    return res.json({
      status: true,
      user,
      message: "Profile Picture updated!",
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.findUserRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const users = await User.find().sort({ points: -1 });
    const userIndex = users.findIndex((user: any) => user.id === userId);
    const ranking = userIndex !== -1 ? userIndex + 1 : null;

    return res.json({
      status: true,
      ranking,
      allUsersRanked: users.length,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.changeTitles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { name, display } = req.body; // display is the opposite of the current title "display" status

    const user = await User.findOneAndUpdate(
      { _id: userId, "titles.name": name },
      { $set: { "titles.$.display": display } }, // set selected title display status to it`s opposite
      { new: true }
    );

    return res.json({
      status: true,
      user,
    });
  } catch (ex) {
    next(ex);
  }
};
