import { Request, Response, NextFunction } from "express";
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

interface Movie {
  id: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
}

interface AddRatingRequest extends Request {
  body: {
    userId: string;
    rating: number;
    movie: Movie;
  };
}

interface FindAllRatedRequest extends Request {
  body: {
    userId: string;
    type?: string;
  };
}

module.exports.addRating = async (
  req: AddRatingRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, rating, movie } = req.body;

    const existingRating = await Rating.findOne({ userId, id: movie.id });

    if (existingRating) {
      await Rating.findOneAndUpdate(
        { userId, id: movie.id },
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
      id: movie.id,
      rating,
      media_type: movie.media_type,
      original_title: movie.title || movie.name,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { ratings: newRating },
      },
      { new: true }
    );

    return res.json({
      status: true,
      message: "Thanks for rating!",
      user: user,
    });
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
    const { userId } = req.params;
    const { type } = req.query;

    let data;
    if (type === "All") data = await Rating.find({ userId });
    else {
      data = await Rating.find({ userId, media_type: type });
    }

    return res.json({ status: true, data });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getRecent = async (
  req: FindAllRatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const response = await Rating.find({ userId });
    const recentRating = response[response.length - 1];
    return res.json({ status: true, recentRating });
  } catch (ex) {
    next(ex);
  }
};
