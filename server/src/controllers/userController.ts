const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req: any, res: any, next: any) => {
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

module.exports.register = async (req: any, res: any, next: any) => {
  try {
    const { email, password, firstName, lastName } = req.body;

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
