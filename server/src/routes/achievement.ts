const {
  getAchievements,
  assignAchievement,
} = require("../controllers/achievementController");

const router3 = require("express").Router();

// POST
router3.post("/assignAchievement", assignAchievement);

// GET
router3.get("/getAchievements", getAchievements);

// PUT

// DELETE

module.exports = router3;
