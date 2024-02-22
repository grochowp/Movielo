import { useEffect } from "react";
import { fetchMovie } from "../../../types";

const Selected: React.FC<fetchMovie> = ({ fetchMovie }) => {
  //   const [genre, setGenre] = useState("");
  useEffect(() => {
    fetchMovie(
      "https://api.themoviedb.org/3/discover/movie?api_key=517b169262cdb15744de5a86e7e797c1&with_genres=28"
    );
  }, [fetchMovie]);

  return <div></div>;
};
export default Selected;
