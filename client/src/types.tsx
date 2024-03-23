interface IRating {
  _id: string;
  media_type: string;
}

export interface ITitle {
  name: string;
  display: boolean;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  points: number;
  achievements: Array<string>;
  ratings: Array<IRating>;
  titles: Array<ITitle>;
  profilePicture: string;
}

export interface Movie {
  IDs: Array<number>; // IDs of genres
  id: number;
  original_title: string; // direct fetch
  original_name: string; // direct fetch
  poster_path: string;
  backdrop_path: string;
  rating: number; // logged user rating
  overview: string;
  vote_average: number; // other users avg rating
  media_type: string;
  release_date: string;
  first_air_date: string;
}

export interface fetchMovie {
  url: string;
  genre?: string;
}
