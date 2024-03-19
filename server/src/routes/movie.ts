const { getMovies } = require("../controllers/movieController");
const {
  addRating,
  findAllRated,
  getRecent,
} = require("../controllers/ratingController");
const {
  addFavMovie,
  handleFav,
  deleteFavMovie,
  findFavorites,
} = require("../controllers/favoriteController");

const router2 = require("express").Router();

// POST
router2.post("/getMovie", getMovies);
router2.post("/rateMovie", addRating);
router2.post("/addFavMovie", addFavMovie);

// GET
router2.get("/handleFav", handleFav);
router2.get("/findFavorites/:sort", findFavorites);
router2.get("/findAllRated/:userId", findAllRated);
router2.get("/getRecent/:userId", getRecent);
// PUT

// DELETE
router2.delete("/deleteFavMovie", deleteFavMovie);

module.exports = router2;
