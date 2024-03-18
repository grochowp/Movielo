import {
  sendRequestPOST,
  sendRequestGET,
  sendRequestDELETE,
} from "./crudService";

export const MovieService = {
  getMovie: async (apiURL: string) => {
    const url = "http://localhost:3000/api/movie/getMovie";
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

    return await sendRequestPOST(url, body);
  },

  rateMovie: async (
    userId: string,
    id: number,
    rating: number,
    type: string,
    title: string
  ) => {
    const url = "http://localhost:3000/api/movie/rateMovie";
    const body = {
      userId,
      id,
      rating,
      type,
      title,
    };
    return await sendRequestPOST(url, body);
  },

  addFavMovie: async (userId: string, movie: object, type: string) => {
    const url = "http://localhost:3000/api/movie/addFavMovie";
    const body = {
      userId,
      movie,
      type,
    };
    return await sendRequestPOST(url, body);
  },

  handleFav: async (userId: string, movieId: number) => {
    const url = `http://localhost:3000/api/movie/handleFav?userId=${userId}&movieId=${movieId}`;

    return await sendRequestGET(url);
  },

  deleteFavMovie: async (userId: string, movieId: number) => {
    const url = `http://localhost:3000/api/movie/deleteFavMovie?userId=${userId}&movieId=${movieId}`;
    return await sendRequestDELETE(url);
  },

  findAllRated: async (userId: string, type: string) => {
    const url = `http://localhost:3000/api/movie/findAllRated/${userId}?type=${type}`;

    return await sendRequestGET(url);
  },

  findFavorites: async (userId: string, type: string, sort: string) => {
    const url = `http://localhost:3000/api/movie/findFavorites/${sort}?type=${type}&userId=${userId}`;

    return await sendRequestGET(url);
  },
};
