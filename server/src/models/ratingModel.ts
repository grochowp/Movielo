const mongoose2 = require("mongoose");

const ratingSchema = new mongoose2.Schema({
  userId: {
    type: mongoose2.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  movieId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
});

module.exports = mongoose2.model("Rating", ratingSchema);
