import React, { createContext, useState, useContext, ReactNode } from "react";
import { Movie } from "../types";
import styled from "styled-components";
import StarRating from "../components/StarRating";
import { IoCloseOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";

interface ModalContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  openModal: (movie: Movie) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<string>("");

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <ModalContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        openModal,
      }}
    >
      {selectedMovie && (
        <Modal>
          <article>
            <button className="close" onClick={closeModal}>
              <IoCloseOutline />
            </button>
            <div className="modalWindow">
              <ImageWrapper className="image">
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.original_title}
                />
                <img
                  className="backdrop"
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.original_title}
                />
              </ImageWrapper>
              <div className="desc">
                <Description>
                  <div>
                    <h1>
                      {selectedMovie.original_title ||
                        selectedMovie.original_name}
                    </h1>
                    <span>
                      {selectedMovie.vote_average.toFixed(1)}/10
                      <IoStarSharp />
                    </span>
                  </div>
                  <h2>{selectedMovie.overview}</h2>
                </Description>
                <Rating>
                  {/* <div className="info">
                    <p>
                      Type <span>{selectedMovie.media_type || "series"}</span>
                    </p>
                    <p>
                      Released <span>{selectedMovie.release_date}</span>
                    </p>
                  </div> */}
                  <div className="rating">
                    <p>Rating</p>
                    <StarRating
                      maxRating={10}
                      size={24}
                      key={selectedMovie.id}
                      onSetRating={setUserRating}
                    />
                    <button>Rate</button>
                  </div>
                </Rating>
              </div>
            </div>
          </article>
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };

const Modal = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  min-height: 100vh;
  max-width: 1920px;
  z-index: 3;
  background-color: rgba(7, 7, 7, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .close {
    float: right;
    margin-right: 1rem;
    margin-top: 1rem;
    font-size: 4rem;
    background: none;
    border: none;
    color: ${(props) => props.theme.color};
    cursor: pointer;

    @media (max-width: 650px) {
      margin-top: 1vw;
      margin-right: 1vw;
      font-size: 6vw;
    }
  }

  article {
    width: 80rem;
    height: 40rem;
    background-color: ${(props) => props.theme.componentsBackground};
    border-radius: 15px;

    @media (max-width: 1350px) {
      width: 94vw;
      height: 48vw;
    }

    @media (max-width: 650px) {
      width: 70vw;
      height: max-content;
    }
  }

  .modalWindow {
    display: flex;
    flex-direction: row;

    height: max-content;
    @media (max-width: 650px) {
      flex-direction: column;
    }

    .desc {
      margin-left: 2rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      color: ${(props) => props.theme.color};
      gap: 0.5rem;
    }
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 auto;
  margin: 2.5rem;
  height: max-content;

  .backdrop {
    width: 63vw;
    display: none;
  }

  .poster {
    max-width: 23.3rem;
    width: 28vw;
    height: auto;
    border-radius: 5px;
  }

  @media (max-width: 1350px) {
    margin: 3vw;
  }

  @media (max-width: 650px) {
    .poster {
      display: none;
    }

    .backdrop {
      display: flex;
      margin-top: 5vw;
      img {
        width: 20vw;
      }
    }
  }
`;

const Description = styled.div`
  height: 60%;

  @media (max-width: 850px) {
    margin: 0;
    padding: 0;
  }
  h2 {
    height: 35%;
    font-size: 0.8rem;
    width: 70%;
    font-family: "Inika", serif;
    font-weight: 100;

    @media (max-width: 1350px) {
      font-size: 1.15vw;
      width: 80%;
    }

    @media (max-width: 850px) {
      font-size: 1.25vw;
      width: 100%;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    margin: 4rem 0 2.5rem 0;
    gap: 1rem;

    span {
      width: 25%;
      font-size: 1.5rem;

      svg {
        color: yellow;
        margin-left: 0.5rem;
        transform: translateY(0.2rem);
      }
    }

    h1 {
      font-size: 2.75rem;
      font-family: "Kadwa", sans-serif;
      font-weight: 100;
      line-height: 1.25;
      width: 75%;
      height: max-content;
    }

    @media (max-width: 1350px) {
      margin: 3vw 0 1.5vw 0;

      span {
        width: 35%;
        font-size: 2.5vw;
        svg {
          margin-left: 0.5rem;
          transform: translateY(0.1rem);
        }
      }

      h1 {
        line-height: 1.25;
        width: 65%;
        font-size: 2.5vw;
      }
    }

    @media (max-width: 650px) {
      margin: 0;

      span {
        width: 25%;

        svg {
          margin-left: 0.5rem;
          transform: 0;
        }
      }

      h1 {
        line-height: 1.25;
        // margin: 0;
        width: 75%;
        font-size: 2.5vw;
      }
    }
  }
`;

const Rating = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
  align-items: center;

  .info {
    width: 35%;

    p {
      font-size: 2rem;
    }

    span {
      float: right;
      font-size: 1rem;
      transform: translateY(0.5rem);
    }
  }

  .rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 35%;
    margin-bottom: 1rem;

    p {
      font-family: "Kadwa", sans-serif;
      font-weight: 100;
      font-size: 1.75rem;
      margin: 0 0 1rem 0;
    }

    button {
      margin: 1rem 0 0 0;
      width: 8rem;
      height: 2.5rem;
      background-color: ${(props) => props.theme.color};
      border-radius: 20px;
      color: ${(props) => props.theme.componentsBackground};
      border: none;
      font-size: 1.45rem;
      cursor: pointer;
      font-family: "Inika", serif;
      font-weight: 100;
    }

    @media (max-width: 1350px) {
      p {
        font-size: 1.25rem;
        margin: 0 0 0.25rem 0;
      }

      svg {
        width: 24px;
      }
      button {
        margin: 0.25rem 0 0 0;
        width: 6rem;
        height: 1.75rem;
        background-color: ${(props) => props.theme.color};
        border-radius: 20px;
        color: ${(props) => props.theme.componentsBackground};
        border: none;
        font-size: 1rem;
      }
    }

    @media (max-width: 650px) {
      p {
        font-size: 4vw;

        margin: 0 0 1.5vw 0;
      }

      span {
        width: 4vw !important;
        height: 4vw !important;
      }
      svg {
        width: 4vw;
      }

      button {
        margin: 1.5vw 0 0 0;
        width: 20vw;
        height: 5vw;
        background-color: ${(props) => props.theme.color};
        border-radius: 20px;
        color: ${(props) => props.theme.componentsBackground};
        border: none;
        font-size: 4vw;
      }
    }
  }
`;
