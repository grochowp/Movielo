import React, { useState, useEffect } from "react";
import { Movie, fetchMovie } from "../../../types";
import styled from "styled-components";

const Trending: React.FC<fetchMovie> = ({ fetchMovie }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMovie(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US"
      );
      setMovies(data.movies); // Zakładając, że data zawiera klucz results z listą filmów
      console.log(data);
      console.log(data.movies);
    }

    fetchData();
  }, [fetchMovie]); // Wywołanie fetchData tylko raz po zamontowaniu komponentu

  return (
    <Trends>
      <h1>Trending</h1>
      <article>
        {movies.map((movie, index) => (
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.name || movie.name}
            />
            {/* <p>{movie.overview}</p> */}
          </div>
        ))}
      </article>
    </Trends>
  );
};

export default Trending;

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
    gap: 1rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 92vw;
    max-width: 1800px;
    height: 390px;

    @media (max-width: 1000px) {
      height: 290px;
    }
    @media (max-width: 600px) {
      height: 190px;
    }
  }

  img {
    flex: 0 0 auto;
    height: 355px;
    border-radius: 10px;
    transition: 1s;
    @media (max-width: 1000px) {
      height: 250px;
    }

    @media (max-width: 600px) {
      height: 150px;
    }
  }

  h1 {
    height: 3rem;
    width: 90%;
    text-align: left;
    margin-left: 5rem;
    font-family: "Kadwa", sans-serif;
    font-size: 2.5rem;
    font-weight: 100;
    color: ${(props) => props.theme.color};
    transition: 1s;

    @media (max-width: 1000px) {
      font-size: 2rem;
      margin-left: 1rem;
    }

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
`;
