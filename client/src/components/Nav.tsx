import styled, { keyframes } from "styled-components";
import { CiUser } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import { useMovies } from "../hooks/useMovies";
import { useModal } from "../contexts/ModalContext";
import { Movie } from "../types";
import { CgProfile } from "react-icons/cg";
import { FaRegChartBar } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { CiSettings, CiTrophy } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Nav: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showUser, setShowUser] = useState<boolean>(false);

  const inputEl = useRef<HTMLInputElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const { movies } = useMovies(query);
  const modal = useModal();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
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
    setQuery("");
    openMovieDetails(movies[selectedIndex]);
    setSelectedIndex(0);
  }, "Enter");

  const openMovieDetails = (movie: Movie) => {
    modal.openModal(movie);
    setQuery("");
  };

  const moveTo = (s: string) => {
    if (s === "login") setUser(null);
    navigate(`/dashboard/${s}`);
  };

  const handleUserIcon = () => {
    if (!user) navigate("/login");
    setShowUser(true);
  };

  return (
    <Navigation>
      {/* <span className="home">
        <IoHomeOutline />
      </span> */}
      <div className="searchbar">
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
      <div>
        {showUser ? (
          <div className="options" onClick={() => setShowUser(false)}>
            <div className="first">
              <div className="img">
                <img src={`${user?.profilePicture}`} alt={"a"} />
              </div>
              <div>
                <h1>
                  {user?.firstName} {user?.lastName}
                </h1>
                <h2>{user?.email}</h2>
              </div>
              <div className="x">
                <IoCloseOutline onClick={() => setShowUser(true)} />
              </div>
            </div>
            <div className="second">
              <p onClick={() => moveTo("profile")}>
                <CgProfile />
                My profile
              </p>

              <p onClick={() => moveTo("statistics")}>
                <FaRegChartBar />
                Statistics
              </p>
              <p onClick={() => moveTo("favorites")}>
                <BsBookmarkStar />
                Favorites
              </p>
              <p onClick={() => moveTo("achievements")}>
                <CiTrophy />
                Achievements
              </p>
            </div>
            <div className="third">
              <p onClick={() => moveTo("settings")}>
                <CiSettings />
                Settings
              </p>
              <p
                onClick={() => moveTo("login")}
                style={{ borderRadius: "0 0 10px 10px", color: "red" }}
              >
                <AiOutlineLogout />
                Log-out
              </p>
            </div>
          </div>
        ) : (
          <span>
            <CiUser className="userIcon" onClick={handleUserIcon} />
          </span>
        )}
      </div>
    </Navigation>
  );
};
export default Nav;

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px; 
  }
`;

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
    margin-top: 2rem;
  }

  @media (max-width: 700px) {
    margin-top: 5vw;
  }

  span {
    z-index: 6;
    margin: 0 2.5rem;
    background-color: ${(props) => props.theme.colorSecondary};
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
    color: ${(props) => props.theme.componentsBackground};
    cursor: pointer;
    transition: 1s;

    @media (max-width: 1200px) {
      font-size: 2rem;
      margin: 0 4vw;
    }
    @media (max-width: 700px) {
      font-size: 1.25rem;
      margin: 0 3vw;
      width: 2rem;
      height: 2rem;
    }
  }

  .searchbar {
    margin: 0 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 20rem;
    z-index: 4;

    @media (max-width: 700px) {
      width: 70%;

      max-width: 10rem;
      margin: 0 5vw;
    }

    @media (max-width: 500px) {
      width: 8rem;
    }
  }

  input {
    height: 3rem;
    width: 20rem;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.colorSecondary};
    color: ${(props) => props.theme.pageBackground};
    font-family: "Inter", sans-serif;
    padding-left: 1rem;

    @media (max-width: 700px) {
      width: 10rem;
      min-width: 0;
      height: 2rem;
      top: 30px;
    }

    @media (max-width: 500px) {
      width: 7rem;
      min-width: 0;
      height: 2rem;
      top: 30px;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    background-color: ${(props) => props.theme.colorSecondary};
    max-height: 17rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: ${(props) => props.theme.pageBackground};
  }

  .options {
    font-weight: 100;
    z-index: 5;
    position: relative;
    top: -0.5rem;
    right: 2rem;
    border-radius: 10px;
    background-color: ${(props) => props.theme.componentsBackground};
    color: ${(props) => props.theme.color};
    width: 18rem;
    height: max-content;
    animation: ${slideDown} 1.5s ease forwards;

    @media (max-width: 700px) {
      margin-top: -0.5rem;
      right: 0.5rem;
    }

    @media (max-width: 500px) {
      margin-top: 0rem;
      width: 10rem;
    }

    p {
      padding-left: 1rem;
      font-size: 1.25rem;
      margin: 0;
      height: 3rem;
      display: flex;
      align-items: center;
      transition: 1s;

      &:hover {
        background-color: ${(props) => props.theme.color};
        color: ${(props) => props.theme.componentsBackground};
        cursor: pointer;
      }

      @media (max-width: 500px) {
        height: 2rem;
        font-size: 0.75rem;
      }
    }

    svg {
      padding-right: 1rem;
      font-size: 1.5rem;
    }

    .first {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;

      div {
        width: 60%;

        h2 {
          opacity: 0.75;
        }

        @media (max-width: 500px) {
          h1 {
            font-size: 0.5rem;
          }

          h2 {
            font-size: 0.45rem;
          }
        }
      }

      .img {
        width: 20%;
      }

      .x {
        width: 10%;
        cursor: pointer;
      }

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;

        @media (max-width: 500px) {
          width: 1.75rem;
          height: 1.75rem;
        }
      }
    }

    .second {
      border-top: 1px solid ${(props) => props.theme.pageBackground};
    }

    .third {
      border-top: 1px solid ${(props) => props.theme.pageBackground};
    }
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
    min-height: 3rem;
    font-size: 0.8rem;
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
      height: 3rem;
    }
  }
`;
