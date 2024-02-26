const Rating = require("../models/ratingModel");
const User2 = require("../models/userModel");

module.exports.addRating = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movieId, rating } = req.body;

    const existingRating = await Rating.findOne({ userId, movieId });

    if (existingRating) {
      const updatedRating = await Rating.findOneAndUpdate(
        { userId, movieId },
        { rating },
        { new: true }
      );

      return res.json({
        message: "Rating updated successfully!",
        status: true,
      });
    }

    const newRating = await Rating.create({
      userId,
      movieId,
      rating,
    });

    await User2.findByIdAndUpdate(userId, {
      $push: { ratings: newRating },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};
