const Favorite = require("../models/favoriteModel");
const User3 = require("../models/userModel");

module.exports.addFavMovie = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movie, genre } = req.body;

    const newFavorite = await Favorite.create({
      userId,
      movieId: movie.id,
      title: movie.title,
      genre,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
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
