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

export const MOVIE_ID = [438631, 808, 324552];
export const API_KEY = "517b169262cdb15744de5a86e7e797c1";

// export const COMEDY_URL = `https://api.themoviedb.org/3/discover/movie?api_key=517b169262cdb15744de5a86e7e797c1&with_genres=35&sort_by=popularity.desc`;

export const TRENDING_SERIES_URL =
  "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

export const TRENDING_MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

export const MAIN_URL =
  "https://api.themoviedb.org/3/movie/324552?api_key=$517b169262cdb15744de5a86e7e797c1";

export const MOVIE_GENRE_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=517b169262cdb15744de5a86e7e797c1&with_genres=28&page=1";

export const SERIES_GENRES = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const MOVIE_GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
