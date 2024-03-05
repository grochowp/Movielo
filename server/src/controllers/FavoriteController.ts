import { Request, Response, NextFunction } from "express";
const Favorite = require("../models/favoriteModel");
const User = require("../models/userModel");

interface Movie {
  id: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
}

interface AddFavoriteRequest extends Request {
  body: {
    _id: string;
    movie: Movie;
    type: string;
  };
}

interface handleFavorite extends Request {
  body: {
    _id: string;
    movieId: string;
  };
}

interface FindFavoritesRequest extends Request {
  body: {
    _id: string;
    type: string;
    sort: string;
  };
}

function sortByField(field: string, order: string) {
  return function (a: any, b: any) {
    if (field === "releaseDate" || field === "rating") {
      if (order === "asc") {
        return field === "rating"
          ? a[field] - b[field]
          : a[field].localeCompare(b[field]);
      } else {
        return field === "rating"
          ? b[field] - a[field]
          : b[field].localeCompare(a[field]);
      }
    } else if (field === "title") {
      return order === "desc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    } else {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    }
  };
}

module.exports.addFavMovie = async (
  req: AddFavoriteRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, movie, type } = req.body;

    const newFavorite = await Favorite.create({
      userId,
      movieId: movie.id,
      title: movie.title || movie.name,
      type,
      rating: movie.vote_average,
      releaseDate: movie.release_date || movie.first_air_date,
      poster: movie.poster_path,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { favorites: newFavorite },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.handleFav = async (
  req: handleFavorite,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, movieId } = req.body;

    const isFav = await Favorite.findOne({ userId, movieId });

    return res.json({ status: true, favorite: isFav });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteFavMovie = async (
  req: handleFavorite,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, movieId } = req.body;

    const delFav = await Favorite.findOneAndDelete({ userId, movieId });

    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: delFav._id },
    });

    return res.json({ status: true, favorite: false });
  } catch (ex) {
    next(ex);
  }
};

module.exports.findFavorites = async (
  req: FindFavoritesRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId, type, sort } = req.body;

    let favorites;
    if (type !== "all") {
      favorites = await Favorite.find({ userId, type });
    } else {
      favorites = await Favorite.find({ userId });
    }

    if (sort) {
      const order = sort.endsWith("_desc") ? "desc" : "asc";
      const field = order === "desc" ? sort.slice(0, -5) : sort;
      favorites.sort(sortByField(field, order));
    }

    return res.json({ status: true, favorites });
  } catch (ex) {
    next(ex);
  }
};
