export interface User {
  _id: string;
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
  vote_average: number;
  media_type: string;
}

export interface fetchMovie {
  url: string;
  genre?: string;
}
