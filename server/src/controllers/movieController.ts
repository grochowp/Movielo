const Movie = require("../models/movieModel");

module.exports.getMovies = async (req: any, res: any, next: any) => {
  try {
    const { url, options } = req.body;
    const response = await fetch(url, options);
    const data = await response.json();

    res.json({ movies: data.results });
  } catch (ex) {
    next(ex);
  }
};
