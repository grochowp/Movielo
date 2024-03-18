const {
  login,
  register,
  editProfile,
} = require("../controllers/userController");

const router = require("express").Router();

// POST
router.post("/register", register);
router.post("/login", login);

// GET

// PUT
router.put("/editProfile/:userId", editProfile);

// DELETE

module.exports = router;
