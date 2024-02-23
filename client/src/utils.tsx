export const sendRequest = async (
  url: string,
  method: string,
  body: object
) => {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const MOVIE_ID = [324552, 808, 438631];
export const API_KEY = "517b169262cdb15744de5a86e7e797c1";

export const COMEDY_URL = `https://api.themoviedb.org/3/discover/movie?api_key=517b169262cdb15744de5a86e7e797c1&with_genres=35&sort_by=popularity.desc`;

export const TRENDING_URL =
  "https://api.themoviedb.org/3/trending/all/day?language=en-US";

export const ACTION_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=517b169262cdb15744de5a86e7e797c1&with_genres=28";

export const MAIN_URL =
  "https://api.themoviedb.org/3/movie/324552?api_key=$517b169262cdb15744de5a86e7e797c1";
