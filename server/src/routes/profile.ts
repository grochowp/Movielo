const {
  login,
  register,
  editProfile,
  changeProfilePicture,
} = require("../controllers/userController");

const router = require("express").Router();

// POST
router.post("/register", register);
router.post("/login", login);

// GET

// PUT
router.put("/editProfile/:userId", editProfile);
router.put("/changeProfilePicture/:userId", changeProfilePicture);

// DELETE

module.exports = router;
