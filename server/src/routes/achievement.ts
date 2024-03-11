const {
  getAchievements,
  assignAchievement,
} = require("../controllers/achievementController");

const router3 = require("express").Router();

router3.post("/getAchievements", getAchievements);
router3.post("/assignAchievement", assignAchievement);

module.exports = router3;
