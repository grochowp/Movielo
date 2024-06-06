import { Movie } from "../types";
import { URL_HOST } from "../../public/utils";
import { sendRequest } from "./crudService";

export const MovieService = {
  getMovie: async (apiURL: string) => {
    const url = `${URL_HOST}/api/movie/getMovie`;
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

    return await sendRequest(url, "POST", body);
  },

  rateMovie: async (userId: string, rating: number, movie: Movie) => {
    const url = `${URL_HOST}/api/movie/rateMovie`;
    const body = {
      userId,
      rating,
      movie,
    };
    return await sendRequest(url, "POST", body);
  },

  addFavMovie: async (userId: string, movie: object, type: string) => {
    const url = `${URL_HOST}/api/movie/addFavMovie`;
    const body = {
      userId,
      movie,
      type,
    };
    return await sendRequest(url, "POST", body);
  },

  handleFav: async (userId: string, movieId: number) => {
    const url = `${URL_HOST}/api/movie/handleFav?userId=${userId}&movieId=${movieId}`;

    return await sendRequest(url, "GET");
  },

  deleteFavMovie: async (userId: string, movieId: number) => {
    const url = `${URL_HOST}/api/movie/deleteFavMovie?userId=${userId}&movieId=${movieId}`;
    return await sendRequest(url, "DELETE");
  },

  findAllRated: async (userId: string, type: string) => {
    const url = `${URL_HOST}/api/movie/findAllRated/${userId}?type=${type}`;

    return await sendRequest(url, "GET");
  },

  findFavorites: async (userId: string, type: string, sort: string) => {
    const url = `${URL_HOST}/api/movie/findFavorites/${sort}?type=${type}&userId=${userId}`;

    return await sendRequest(url, "GET");
  },

  getRecent: async (userId: string) => {
    const url = `${URL_HOST}/api/movie/getRecent/${userId}`;

    return await sendRequest(url, "GET");
  },
};
