import { ChangeEvent, useEffect, useState } from "react";
import { API_KEY, MOVIE_GENRES, SERIES_GENRES } from "../../../utils";
import { MovieService } from "../../../services/movieService";
import styled from "styled-components";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { Movie } from "../../../types";
import { useModal } from "../../../contexts/ModalContext";

const Selected: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [type, setType] = useState<string>("movie");
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<number>(18);

  const modal = useModal();

  useEffect(() => {
    fetchAndSetMovies(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}&page=${page}`
    );
  }, [page, type, genre]);

  const fetchAndSetMovies = async (apiURL: string) => {
    try {
      const response = await MovieService.getMovie(apiURL);
      const data = response.movies.slice(0, 15);
      setMovies(data);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania filmów:", error);
    }
  };

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenre(parseInt(event.target.value));
  };

  const handleCheckbox = (type: string) => {
    type === "movie"
      ? (() => {
          setType("movie");
          setGenre(MOVIE_GENRES[0].id);
        })()
      : (() => {
          setType("tv");
          setGenre(SERIES_GENRES[0].id);
        })();
  };

  return (
    <GenreSelection>
      <article className="first">
        {type === "tv" ? (
          <select
            id="genresSeries"
            name="Series"
            aria-label="Series"
            value={genre}
            onChange={handleGenreChange}
          >
            {SERIES_GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        ) : (
          <select
            id="genresMovies"
            name="Movies"
            aria-label="Movies"
            value={genre}
            onChange={handleGenreChange}
          >
            {MOVIE_GENRES.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        )}
        <div className="selection-container">
          <div className="checkbox" onClick={() => handleCheckbox("movie")}>
            <p>Movies</p>{" "}
            {type === "movie" ? (
              <IoIosCheckmarkCircle />
            ) : (
              <IoIosCheckmarkCircleOutline />
            )}
          </div>
          <div className="checkbox" onClick={() => handleCheckbox("tv")}>
            <p>Series</p>

            {type === "tv" ? (
              <IoIosCheckmarkCircle />
            ) : (
              <IoIosCheckmarkCircleOutline />
            )}
          </div>
        </div>
      </article>

      <article className="second">
        {movies.map((movie, index) => (
          <div key={index} onClick={() => modal.openModal(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
        ))}
      </article>

      <article className="third">
        <button
          className={`${page - 5 <= 0 ? "prev-next disabled" : "prev-next"}`}
          onClick={() => setPage(page - 5)}
        >
          {"<< 5"}
        </button>
        <div>
          <button
            className={`${page - 1 === 0 ? "disabled" : ""}`}
            onClick={() => setPage(page - 1)}
          >
            {page - 1}
          </button>
          <button className="selected">{page}</button>
          <button onClick={() => setPage(page + 1)}>{page + 1}</button>
        </div>
        <button className="prev-next" onClick={() => setPage(page + 5)}>
          {"5 >>"}
        </button>
      </article>
    </GenreSelection>
  );
};
export default Selected;

const GenreSelection = styled.section`
  background-color: ${(props) => props.theme.pageBackground};
  width: 100vw;
  max-width: 1920px;

  .first {
    display: flex;
    height: max-content;
    justify-content: space-around;

    align-items: center;
    width: 100%;

    select {
      height: 3rem;
      width: 12rem;

      background-color: ${(props) => props.theme.componentsBackground};
      border: none;
      color: ${(props) => props.theme.color};
      padding: 0 1rem;
      font-size: 1.25rem;
      font-family: "Inika", serif;
      font-weight: 100;
      border-radius: 50px;
      border-right: 16px solid transparent;
      cursor: pointer;

      @media (max-width: 700px) {
        width: 30vw;
        height: 10vw;
        max-height: 3rem;
        font-size: 3vw;

        border-right: 4px solid transparent;
      }
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .selection-container {
      gap: 5rem;

      @media (max-width: 1000px) {
        gap: 3vw;
      }
    }

    .checkbox {
      background-color: ${(props) => props.theme.componentsBackground};
      border-radius: 50px;
      height: 3rem;
      width: 9rem;
      gap: 1rem;
      cursor: pointer;

      @media (max-width: 700px) {
        width: 20vw;
        height: 10vw;
        max-height: 3rem;
        gap: 1.5vw;
      }

      p {
        font-family: "Inika", serif;
        font-weight: 100;
        font-size: 1.25rem;
        color: ${(props) => props.theme.color};
        @media (max-width: 700px) {
          font-size: 3vw;
        }
      }

      svg {
        font-size: 2rem;
        color: ${(props) => props.theme.color};
        @media (max-width: 700px) {
          font-size: 5vw;
        }
      }
    }
  }

  .second {
    display: flex;
    flex-wrap: wrap;
    margin: 1vw 9rem 0 9rem;
    max-width: 1620px;
    justify-content: center;

    @media (max-width: 1550px) {
      margin: 2vw 7vw 0 7vw;
    }
    div {
      margin: 0.5rem 1rem;
      @media (max-width: 1100px) {
        margin: 1vw;
      }
    }

    img {
      width: 14vw;
      max-width: 16rem;
      border-radius: 10px;
      transition: 1s;
      cursor: pointer;
      @media (max-width: 800px) {
        width: 18vw;
        min-width: 0;
      }

      @media (max-width: 600px) {
        width: 24vw;
      }
    }
    img:hover {
      transform: scale(1.05);
    }
  }

  .third {
    display: flex;
    gap: 5rem;
    justify-content: center;
    height: 7rem;
    align-items: center;

    @media (max-width: 650px) {
      gap: 10vw;
    }
    div button {
      margin: 0 0.5rem;
      transition: 0.5s;
      @media (max-width: 650px) {
        margin: 0 0.25rem;
      }
    }

    .selected {
      background-color: ${(props) => props.theme.color};
      border: 0px solid ${(props) => props.theme.color};
      color: ${(props) => props.theme.componentsBackground};
    }

    .prev-next {
      transition: 0.5s;
      width: 8rem;
      border-radius: 30px;

      @media (max-width: 650px) {
        width: 5rem;
      }
    }

    .disabled {
      pointer-events: none;
      background-color: ${(props) => props.theme.pageBackground};
      user-select: none;

      color: ${(props) => props.theme.pageBackground};
    }

    button {
      cursor: pointer;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      background: none;
      background-color: ${(props) => props.theme.componentsBackground};
      border: 0px solid ${(props) => props.theme.color};
      color: ${(props) => props.theme.color};
      font-size: 1.25rem;
      font-family: "Inika", serif;
      font-weight: 100;

      @media (max-width: 650px) {
        width: 2rem;
        height: 2rem;
        font-size: 0.85rem;
      }
      &:hover {
        background-color: ${(props) => props.theme.color};
        border: 0px solid ${(props) => props.theme.color};
        color: ${(props) => props.theme.componentsBackground};
      }
    }
  }
`;
