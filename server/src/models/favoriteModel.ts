const mongoose3 = require("mongoose");

const favoriteSchema = new mongoose3.Schema({
  userId: {
    type: mongoose3.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  poster: { type: String, required: true },
});

module.exports = mongoose3.model("Favorite", favoriteSchema);
