const mongoose2 = require("mongoose");

const ratingSchema = new mongoose2.Schema({
  userId: {
    type: mongoose2.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  id: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  poster_path: { type: String, required: true },
  vote_average: { type: Number, required: true },
  release_date: { type: String, required: true },
});

module.exports = mongoose2.model("Rating", ratingSchema);
