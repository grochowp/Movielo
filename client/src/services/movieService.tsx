import { sendRequest } from "../utils";

export const MovieService = {
  getMovie: async (apiURL: string) => {
    const url = "http://localhost:3000/api/movie/getMovie";
    const method = "POST";
    const body = {
      url: apiURL,
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdiMTY5MjYyY2RiMTU3NDRkZTVhODZlN2U3OTdjMSIsInN1YiI6IjY1Y2RlZGI4YjA0NjA1MDE0NWQ5YWFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqdwRHEyatrUiLFBzng420IJilyenwS2cvjIVIoknek",
        },
      },
    };

    return await sendRequest(url, method, body);
  },

  rateMovie: async (_id: string, movieId: number, rating: number) => {
    const url = "http://localhost:3000/api/movie/rateMovie";
    const method = "POST";
    const body = {
      _id,
      movieId,
      rating,
    };
    return await sendRequest(url, method, body);
  },

  addFavMovie: async (_id: string, movie: object, genre: string) => {
    const url = "http://localhost:3000/api/movie/addFavMovie";
    const method = "POST";
    const body = {
      _id,
      movie,
      genre,
    };
    return await sendRequest(url, method, body);
  },

  handleFav: async (_id: string, movieId: number) => {
    const url = "http://localhost:3000/api/movie/handleFav";
    const method = "POST";
    const body = {
      _id,
      movieId,
    };
    return await sendRequest(url, method, body);
  },

  deleteFavMovie: async (_id: string, movieId: number) => {
    const url = "http://localhost:3000/api/movie/deleteFavMovie";
    const method = "POST";
    const body = {
      _id,
      movieId,
    };
    return await sendRequest(url, method, body);
  },
};
