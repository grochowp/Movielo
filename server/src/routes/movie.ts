const { getMovies } = require("../controllers/movieController");
const { addRating } = require("../controllers/ratingController");
const { addFavMovie } = require("../controllers/favoriteController");

const router2 = require("express").Router();

router2.post("/getMovie", getMovies);
router2.post("/rateMovie", addRating);
router2.post("/addFavMovie", addFavMovie);

module.exports = router2;
