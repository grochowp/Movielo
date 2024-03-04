import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Main from "./components/Main";
import Selected from "./components/Selected";
import MovieSlider from "./components/MovieSlider";
import { TRENDING_MOVIES_URL, TRENDING_SERIES_URL } from "../../utils";
import { ThreeCircles } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const MainMenu: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Adjust max-width as needed

  useEffect(() => {
    const intervalTime = isMobile ? 1500 : 750;
    const intervalId = setInterval(() => {
      setIsLoading(false);
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMobile]);

  return (
    <>
      {isLoading && (
        <Loader>
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#d9d9d9"
            ariaLabel="three-circles-loading"
          />
        </Loader>
      )}
      <div style={{ display: isLoading ? "none" : "" }}>
        <Nav />
        <Main />
        <MovieSlider url={TRENDING_MOVIES_URL} genre={`Trending movies`} />
        <MovieSlider url={TRENDING_SERIES_URL} genre={`Trending series`} />
        <Selected />
        <Footer />
      </div>
    </>
  );
};

export default MainMenu;

const Loader = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  background-color: #202020;
`;
