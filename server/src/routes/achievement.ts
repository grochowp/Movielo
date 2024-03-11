const { getAchievements } = require("../controllers/achievementController");

const router3 = require("express").Router();

router3.post("/getAchievements", getAchievements);

module.exports = router3;
