import { Request, Response, NextFunction } from "express";
const Favorite = require("../models/favoriteModel");
const User = require("../models/userModel");

interface Movie {
  id: string;
  original_title?: string;
  original_name?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

interface AddFavoriteRequest extends Request {
  body: {
    userId: string;
    movie: Movie;
    type: string;
  };
}

interface handleFavorite extends Request {
  body: {
    userId: string;
    movieId: string;
  };
}

interface FindFavoritesRequest extends Request {
  body: {
    userId: string;
    type: string;
    sort: string;
  };
}

function sortByField(field: string, order: string) {
  return function (a: any, b: any) {
    if (field === "release_date" || field === "vote_average") {
      if (order === "asc") {
        return field === "vote_average"
          ? a[field] - b[field]
          : a[field].localeCompare(b[field]);
      } else {
        return field === "vote_average"
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
    const { userId, movie, type } = req.body;
    const newFavorite = await Favorite.create({
      userId,
      id: movie.id,
      original_title: movie.original_title || movie.original_name,
      media_type: type,
      vote_average: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      overview: movie.overview,
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
    const { userId, movieId } = req.query;

    const isFav = await Favorite.findOne({ userId, id: movieId });

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
    const { userId, movieId } = req.query;
    const delFav = await Favorite.findOneAndDelete({ userId, id: movieId });

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: delFav._id } },
      { new: true }
    );

    return res.json({ status: true, favorite: false, user });
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
    const { userId, type } = req.query;
    const { sort } = req.params;

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
