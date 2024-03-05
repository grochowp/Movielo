const Favorite = require("../models/favoriteModel");
const User3 = require("../models/userModel");

module.exports.addFavMovie = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movie, genre } = req.body;

    const newFavorite = await Favorite.create({
      userId,
      movieId: movie.id,
      title: movie.title || movie.name,
      genre,
      rating: movie.vote_average,
      releaseDate: movie.release_date || movie.first_air_date,
      poster: movie.poster_path,
    });

    await User3.findByIdAndUpdate(userId, {
      $push: { favorites: newFavorite },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.handleFav = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movieId } = req.body;

    const isFav = await Favorite.findOne({ userId, movieId });

    return res.json({ status: true, favorite: isFav });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteFavMovie = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movieId } = req.body;

    const delFav = await Favorite.findOneAndDelete({ userId, movieId });

    await User3.findByIdAndUpdate(userId, {
      $pull: { favorites: delFav._id },
    });

    return res.json({ status: true, favorite: false });
  } catch (ex) {
    next(ex);
  }
};

function sortByField(field: any, order: any) {
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

module.exports.findFavorites = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, type, sort } = req.body;

    let favorites;
    if (type !== "all") {
      favorites = await Favorite.find({ userId, genre: type });
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
