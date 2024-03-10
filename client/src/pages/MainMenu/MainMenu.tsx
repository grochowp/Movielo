import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Main from "./components/Main";
import Selected from "./components/Selected";
import MovieSlider from "./components/MovieSlider";

const MainMenu: React.FC = () => {
  return (
    <>
      <div>
        <Nav />
        <Main />
        <MovieSlider
          url={"https://api.themoviedb.org/3/trending/movie/day?language=en-US"}
          genre={`Trending movies`}
        />
        <MovieSlider
          url={"https://api.themoviedb.org/3/trending/tv/day?language=en-US"}
          genre={`Trending series`}
        />
        <Selected />
        <Footer />
      </div>
    </>
  );
};

export default MainMenu;
