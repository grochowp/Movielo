import { Request, Response, NextFunction } from "express";

interface Options {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}

interface GetMoviesRequest extends Request {
  body: {
    url: string;
    options: Options;
  };
}

module.exports.getMovies = async (
  req: GetMoviesRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, options } = req.body;
    const response = await fetch(url, options);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (ex) {
    next(ex);
  }
};
