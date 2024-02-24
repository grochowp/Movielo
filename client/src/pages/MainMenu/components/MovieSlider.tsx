import React, { useState, useEffect } from "react";
import { Movie, fetchMovie } from "../../../types";
import styled from "styled-components";
import { MovieService } from "../../../services/movieService";
import { useModal } from "../../../contexts/ModalContext";

const MovieSlider: React.FC<fetchMovie> = ({ url, genre }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const modal = useModal();
  const fetchAndSetMovies = async (apiURL: string) => {
    try {
      const response = await MovieService.getMovie(apiURL);
      const data = response.movies;
      setMovies(data);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania filmów:", error);
    }
  };

  useEffect(() => {
    fetchAndSetMovies(url);
  }, [url]);

  return (
    <Trends>
      <h1>{genre}</h1>
      <article>
        {movies.map((movie, index) => (
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
    overflow-x: auto;
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

  div {
    margin: 1rem 0.5rem;
  }

  img {
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
