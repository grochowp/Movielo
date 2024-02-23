import React from "react";
import { User } from "../../types";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Main from "./components/Main";
import Selected from "./components/Selected";
import { ACTION_URL, COMEDY_URL, TRENDING_URL } from "../../utils";
import MovieSlider from "./components/MovieSlider";

interface MainMenuProps {
  user: User;
}

export const MainMenu: React.FC<MainMenuProps> = ({ user }) => {
  console.log(user);

  return (
    <>
      <Nav />
      <Main />
      <MovieSlider url={TRENDING_URL} genre={`Trending`} />
      <MovieSlider url={COMEDY_URL} genre={`Comedy`} />
      <MovieSlider url={ACTION_URL} genre={`Action`} />
      <Selected />
      <Footer />
    </>
  );
};
