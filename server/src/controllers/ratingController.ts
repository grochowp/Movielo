import { Request, Response, NextFunction } from "express";
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

interface AddRatingRequest extends Request {
  body: {
    _id: string;
    id: string;
    rating: number;
    type: string;
    title: string;
  };
}

interface FindAllRatedRequest extends Request {
  body: {
    userId: string;
    type: string;
  };
}

module.exports.addRating = async (
  req: AddRatingRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, id, rating, type, title } = req.body;

    const existingRating = await Rating.findOne({ userId, id });

    if (existingRating) {
      await Rating.findOneAndUpdate({ userId, id }, { rating }, { new: true });

      return res.json({
        message: "Rating updated successfully!",
        status: true,
      });
    }

    const newRating = await Rating.create({
      userId,
      id,
      rating,
      type,
      title,
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
    const { userId, type } = req.body;

    let data;
    if (type === "All") data = await Rating.find({ userId });
    else {
      data = await Rating.find({ userId, type: type });
    }

    return res.json({ status: true, data });
  } catch (ex) {
    next(ex);
  }
};
