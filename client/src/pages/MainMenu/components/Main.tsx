import { useEffect } from "react";
import { fetchMovie } from "../../../types";

const Main: React.FC<fetchMovie> = ({ fetchMovie }) => {
  useEffect(() => {
    fetchMovie("https://api.themoviedb.org/3/trending/all/day?language=en-US");
  }, [fetchMovie]);

  return <div></div>;
};
export default Main;
