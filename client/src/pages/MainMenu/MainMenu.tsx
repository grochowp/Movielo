import React from "react";
import { User } from "../../types";
import { MovieService } from "../../services/movieService";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Main from "./components/Main";
import Selected from "./components/Selected";
import Trending from "./components/Trending";

interface MainMenuProps {
  user: User;
}

export const MainMenu: React.FC<MainMenuProps> = ({ user }) => {
  console.log(user);

  const fetchMovie = async (apiURL: string) => {
    try {
      const response = await MovieService.getMovie(apiURL);
      return response;
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania filmu:", error);
    }
  };

  return (
    <>
      <Nav />
      <Main fetchMovie={fetchMovie} />
      <Trending fetchMovie={fetchMovie} />
      <Selected fetchMovie={fetchMovie} />
      <Footer />
    </>
  );
};
