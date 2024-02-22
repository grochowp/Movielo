const { getMovies } = require("../controllers/movieController");

const router2 = require("express").Router();

router2.post("/getMovie", getMovies);

module.exports = router2;
