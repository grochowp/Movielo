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

//     await client.connect();

//     const { email, password, firstName, lastName } = req.body;

//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     if (!password.match(passwordRegex)) {
//       res.json({ error: "bad password" });
//       return;
//     }

//     const correctedName =
//       firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
//     const correctedSurname =
//       lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();

//     const kolekcja = client.db("Movielo").collection("MovieloCol");
//     const dane = req.body;

//     const result = {
//       email,
//       password,
//       correctedName,
//       correctedSurname,
//     };
//     await kolekcja.insertOne(result);
//     res.json({ message: "Rejestracja udana", user: result });
//   } catch (error) {
//     res.status(500).send("There was an error during register");
//   } finally {
//     await client.close();
//   }

// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };
