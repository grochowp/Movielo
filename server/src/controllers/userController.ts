const User = require("../models/userModel");
const bcrypt = require("bcrypt");
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
      firstName,
      lastName,
      password: hashedPassword,
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
    const { firstName, lastName, userId } = req.body;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
    if (specialChars.test(firstName) || specialChars.test(lastName)) {
      return res.json({ message: "Letters only" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );
    return res.json({ status: true, user, message: "Profile updated!" });
  } catch (ex) {
    next(ex);
  }
};
