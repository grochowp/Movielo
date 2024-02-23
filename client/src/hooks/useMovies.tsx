import { useEffect, useState } from "react";
import { API_KEY } from "../utils";
import { MovieService } from "../services/movieService";
import { Movie } from "../types";

export const KEY = "ad0a8221";

type CallbackFunction = () => void;

export function useMovies(query: string, callback?: CallbackFunction) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await MovieService.getMovie(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
        );

        const moviesWithPosterPath: Movie[] = res.movies.filter(
          (movie: Movie) => movie.poster_path
        );
        setMovies(moviesWithPosterPath);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query, callback]);

  return { movies, error, isLoading };
}
