export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  points: number;
}

export interface Movie {
  IDs: Array<number>;
  id: number;
  name: string;
  poster_path: string;
  rating: number;
  overview: string;
}

export interface fetchMovie {
  fetchMovie: (apiURL: string) => Promise<Movie[]>; // Deklaracja typu dla fetchMovie
}
