import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import { useMovies } from "../hooks/useMovies";

const Nav: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // Indeks zaznaczonego elementu

  const inputEl = useRef<HTMLInputElement>(null); // Ustawienie typu na HTMLInputElement
  const selectedRef = useRef<HTMLLIElement>(null);

  const { movies } = useMovies(query);

  useEffect(() => {
    // Po zmianie selectedIndex, przewiń do zaznaczonego elementu
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useKey(() => {
    if (inputEl.current && document.activeElement === inputEl.current) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, "Escape");

  useKey(() => {
    setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, "ArrowUp");

  useKey(() => {
    setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
  }, "ArrowDown");

  useKey(() => {
    console.log(movies[selectedIndex]);
    setQuery("");
    setSelectedIndex(0);
  }, "Enter");

  const openMovieDetails = (movie: object) => {
    console.log(movie);
  };

  return (
    <Navigation>
      <span>
        <IoHomeOutline />
      </span>
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(() => e.target.value)}
          ref={inputEl}
        ></input>
        {movies && movies.length > 0 && (
          <ul>
            {movies.map((movie, index) => (
              <StyledLi
                key={movie.id}
                onClick={() => openMovieDetails(movie)}
                ref={index === selectedIndex ? selectedRef : null}
                isSelected={index === selectedIndex}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.original_title} poster`}
                />
                {movie.original_title || movie.original_name}
              </StyledLi>
            ))}
          </ul>
        )}
      </div>
      <span>
        <CiUser />
      </span>
    </Navigation>
  );
};
export default Nav;

const Navigation = styled.nav`
  position: fixed;
  width: 100vw;
  max-width: 1920px;
  z-index: 2;
  height: max-content;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  @media (max-width: 1200px) {
    max-height: 8vw;
    margin-top: 1.5rem;
  }

  @media (max-width: 700px) {
    margin-top: 1rem;
  }

  span {
    margin: 0 2.5rem;
    font-size: 2.5rem;
    color: ${(props) => props.theme.color};
    cursor: pointer;
    transition: 1s;

    @media (max-width: 1200px) {
      font-size: 2rem;
      margin: 0 4vw;
    }
    @media (max-width: 700px) {
      font-size: 1.5rem;
      margin: 0 4vw;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    height: 20rem;
    align-items: center;
    max-width: 25rem;

    @media (max-width: 700px) {
      width: 70%;
      max-width: 15rem;
    }

    @media (max-width: 700px) {
      width: 70%;
      max-width: 10rem;
    }
  }
  input {
    margin-left: 1rem;
    height: 3rem;
    min-width: 25rem;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.pageBackground};
    font-family: "Inter", sans-serif;
    padding-left: 1rem;

    @media (max-width: 700px) {
      width: 100%;
      min-width: 0;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0 0 0 1rem;
    background-color: ${(props) => props.theme.colorSecondary};
    max-height: 17rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 700px) {
      width: 100%;
      max-width: 15rem;
    }
  }

  input:focus {
    outline: none;
  }
`;

const StyledLi = styled.li<{ isSelected: boolean }>`
  color: ${(props) =>
    props.isSelected ? props.theme.color : props.theme.componentsBackground};
  padding: 4px;
  min-height: 5rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.componentsBackground};
  gap: 1rem;
  background-color: ${(props) =>
    props.isSelected ? props.theme.componentsBackground : ""};

  @media (max-width: 700px) {
    min-height: 4rem;
    font-size: 1rem;
  }

  .selected {
    background-color: red;
  }

  &:hover {
    background-color: ${(props) => props.theme.componentsBackground};
    color: ${(props) => props.theme.color};
  }

  img {
    height: 5rem;
    @media (max-width: 700px) {
      height: 4rem;
    }
  }
`;
