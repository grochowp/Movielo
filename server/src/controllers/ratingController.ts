const Rating = require("../models/ratingModel");
const User2 = require("../models/userModel");

module.exports.addRating = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movieId, rating, genre, title } = req.body;

    const existingRating = await Rating.findOne({ userId, movieId });

    if (existingRating) {
      Rating.findOneAndUpdate({ userId, movieId }, { rating }, { new: true });

      return res.json({
        message: "Rating updated successfully!",
        status: true,
      });
    }

    const newRating = await Rating.create({
      userId,
      movieId,
      rating,
      genre,
      title,
    });

    await User2.findByIdAndUpdate(userId, {
      $push: { ratings: newRating },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.findAllRated = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId } = req.body;

    const movies = await Rating.find({ userId, genre: "movie" });
    const series = await Rating.find({ userId, genre: "tv" });

    return res.json({ status: true, movies, series });
  } catch (ex) {
    next(ex);
  }
};
