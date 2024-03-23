const {
  login,
  register,
  editProfile,
  changeProfilePicture,
  findUserRating,
  changeTitles,
} = require("../controllers/userController");

const router = require("express").Router();

// POST
router.post("/register", register);
router.post("/login", login);

// GET

// PUT
router.put("/editProfile/:userId", editProfile);
router.put("/changeProfilePicture/:userId", changeProfilePicture);
router.get("/findUserRating/:userId", findUserRating);
router.get("/changeTitles/:userId", changeTitles);
// DELETE

module.exports = router;
