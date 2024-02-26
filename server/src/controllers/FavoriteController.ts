const Favorite = require("../models/favoriteModel");
const User3 = require("../models/userModel");

module.exports.addFavMovie = async (req: any, res: any, next: any) => {
  try {
    const { _id: userId, movie } = req.body;

    const newFavorite = await Favorite.create({
      userId,
      movieId: movie.id,
      title: movie.title,
      genres: "aa",
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    });

    await User3.findByIdAndUpdate(userId, {
      $push: { favorites: newFavorite },
    });

    return res.json({ status: true, message: "Thanks for rating!" });
  } catch (ex) {
    next(ex);
  }
};
