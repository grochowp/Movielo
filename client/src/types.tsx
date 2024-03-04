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
  original_name: string;
  poster_path: string;
  backdrop_path: string;
  rating: number;
  overview: string;
  vote_average: number;
  media_type: string;
  title: string;
}

export interface fetchMovie {
  url: string;
  genre?: string;
}
