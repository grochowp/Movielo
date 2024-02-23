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
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  rating: number;
  overview: string;
  original_name: string;
}

export interface fetchMovie {
  url: string;
  genre?: string;
}
