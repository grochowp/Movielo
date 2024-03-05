const { getMovies } = require("../controllers/movieController");
const { addRating, findAllRated } = require("../controllers/ratingController");
const {
  addFavMovie,
  handleFav,
  deleteFavMovie,
  findFavorites,
} = require("../controllers/favoriteController");

const router2 = require("express").Router();

router2.post("/getMovie", getMovies);
router2.post("/rateMovie", addRating);
router2.post("/addFavMovie", addFavMovie);
router2.post("/handleFav", handleFav);
router2.post("/deleteFavMovie", deleteFavMovie);
router2.post("/findAllRated", findAllRated);
router2.post("/findFavorites", findFavorites);

module.exports = router2;
