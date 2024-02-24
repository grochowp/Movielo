import React from "react";
import { User } from "../../types";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Main from "./components/Main";
import Selected from "./components/Selected";
import MovieSlider from "./components/MovieSlider";
import { TRENDING_MOVIES_URL, TRENDING_SERIES_URL } from "../../utils";

interface MainMenuProps {
  user: User;
}

export const MainMenu: React.FC<MainMenuProps> = ({ user }) => {
  console.log(user);

  return (
    <>
      <Nav />
      <Main />
      <MovieSlider url={TRENDING_MOVIES_URL} genre={`Trending movies`} />
      <MovieSlider url={TRENDING_SERIES_URL} genre={`Trending series`} />
      <Selected />
      <Footer />
    </>
  );
};
