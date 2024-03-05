import { Request, Response, NextFunction } from "express";
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

interface AddRatingRequest extends Request {
  body: {
    _id: string;
    movieId: string;
    rating: number;
    genre: string;
    title: string;
  };
}

interface FindAllRatedRequest extends Request {
  body: {
    _id: string;
  };
}

module.exports.addRating = async (
  req: AddRatingRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, movieId, rating, genre, title } = req.body;

    const existingRating = await Rating.findOne({ userId, movieId });

    if (existingRating) {
      await Rating.findOneAndUpdate(
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
      genre,
      title,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { ratings: newRating },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.findAllRated = async (
  req: FindAllRatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId } = req.body;

    const movies = await Rating.find({ userId, genre: "movie" });
    const series = await Rating.find({ userId, genre: "tv" });

    return res.json({ status: true, movies, series });
  } catch (ex) {
    next(ex);
  }
};
