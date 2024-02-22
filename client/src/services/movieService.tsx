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
};
