import React, { useState, useEffect } from "react";
import { Movie, fetchMovie } from "../../../types";
import styled, { keyframes } from "styled-components";
import { MovieService } from "../../../services/movieService";
import { useModal } from "../../../contexts/ModalContext";

const MovieSlider: React.FC<fetchMovie> = ({ url, genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const modal = useModal();

  const fetchAndSetMovies = async (apiURL: string) => {
    try {
      const response = await MovieService.getMovie(apiURL);
      const data = response.movies;
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error while fetching movie data", error);
    }
  };

  useEffect(() => {
    fetchAndSetMovies(url);
  }, [url]);

  return (
    <Trends>
      <h1>{genre}</h1>

      <article>
        {isLoading
          ? Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="loaders"></div>
            ))
          : movies.map((movie, index) => (
              <div key={index} onClick={() => modal.openModal(movie)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
              </div>
            ))}
      </article>
    </Trends>
  );
};

export default MovieSlider;

const loading = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Trends = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1920px;
  background-color: ${(props) => props.theme.pageBackground};
  justify-content: center;
  align-items: center;

  article {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: 92vw;
    max-width: 1800px;
    height: 410px;
    margin-bottom: 5rem;

    @media (max-width: 1000px) {
      height: 290px;
      margin-bottom: 3rem;
    }
    @media (max-width: 600px) {
      height: 190px;
    }
  }

  .loaders {
    background-color: ${(props) => props.theme.componentsBackground};
    animation: ${loading} 2s;
    animation-iteration-count: infinite;
    border-radius: 10px;
    height: 355px;
    aspect-ratio: 4/6;
    flex: 0 0 auto;

    @media (max-width: 1000px) {
      height: 250px;
    }
    @media (max-width: 600px) {
      height: 150px;
    }
  }

  div {
    margin: 1rem 0.5rem;
  }

  img {
    box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
    flex: 0 0 auto;
    height: 355px;
    border-radius: 10px;
    transition: 1s;
    cursor: pointer;
    @media (max-width: 1000px) {
      height: 250px;
    }

    @media (max-width: 600px) {
      height: 150px;
    }
  }
  img:hover {
    transform: scale(1.05);
  }

  h1 {
    height: 4rem;
    width: 90%;
    text-align: left;
    margin-left: 4rem;
    font-family: "Kadwa", sans-serif;
    font-size: 2.5rem;
    font-weight: 100;
    color: ${(props) => props.theme.color};
    transition: 1s;

    @media (max-width: 1000px) {
      font-size: 2rem;
      margin-left: 1rem;
      height: 3rem;
    }

    @media (max-width: 600px) {
      font-size: 1.5rem;
      height: 2rem;
    }
  }
`;
