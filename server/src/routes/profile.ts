const {
  login,
  register,
  editProfile,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/editProfile", editProfile);

module.exports = router;
