const mongoose3 = require("mongoose");

const favoriteSchema = new mongoose3.Schema({
  userId: {
    type: mongoose3.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  id: { type: String, required: true },
  original_title: { type: String, required: true },
  media_type: { type: String, required: true },
  vote_average: { type: Number, required: true },
  release_date: { type: String, required: true },
  poster_path: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  overview: { type: String, required: true },
});

module.exports = mongoose3.model("Favorite", favoriteSchema);
