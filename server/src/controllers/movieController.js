const Movie = require("../models/movieModel");

module.exports.getMovies = async (req, res, next) => {
  try {
    const { url, options } = req.body;
    const response = await fetch(url, options);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (ex) {
    next(ex);
  }
};
