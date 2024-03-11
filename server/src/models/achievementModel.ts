const mongoose4 = require("mongoose");

const achievementSchema = new mongoose4.Schema({
  name: { type: String, required: true },
  tier: { type: Number, required: true },
  title: { type: String, required: false },
  type: { type: String, required: true },
  points: { type: Number, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose4.model("Achievements", achievementSchema);
