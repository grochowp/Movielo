import styled, { keyframes } from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { ChangeEvent, useEffect, useState } from "react";
import { Movie } from "../../types";
import { MovieService } from "../../services/movieService";
import { useUser } from "../../contexts/UserContext";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { IoStarSharp } from "react-icons/io5";

const Favorites: React.FC = () => {
  const { user, setUser } = useUser();
  const [favorites, setFavorites] = useState<Array<Movie>>([]);
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const deleteFavMovie = async (movie: Movie) => {
    if (user) {
      const response = await MovieService.deleteFavMovie(user._id, movie.id);
      setUser(response.user);
      fetchAndSetMovies();
    }
  };

  const fetchAndSetMovies = async () => {
    try {
      if (user) {
        const response = await MovieService.findFavorites(user._id, type, sort);

        setFavorites(response.favorites);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error while fetching movie data", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, sort]);

  const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };
  const handleChangeSort = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <>
      <ProfileHeader>Favorites</ProfileHeader>
      <Content>
        <div className="selectBars">
          <div>
            <h3>Select</h3>
            <select
              id="SelectType"
              name="Type"
              aria-label="Type"
              value={type}
              onChange={handleChangeType}
            >
              <option key={"all"} value={"all"}>
                All
              </option>
              <option key={"movies"} value={"Movie"}>
                Movies
              </option>
              <option key={"series"} value={"Series"}>
                Series
              </option>
            </select>
          </div>
          <div>
            <h3>Sort by</h3>

            <select
              id="SelectSort"
              name="Sort"
              aria-label="Sort"
              value={sort}
              onChange={handleChangeSort}
            >
              <option key={"ratingUp"} value={"vote_average_desc"}>
                High rated
              </option>
              <option key={"ratingDown"} value={"vote_average"}>
                Low rated
              </option>
              <option key={"nameUp"} value={"title_desc"}>
                Title A-Z
              </option>
              <option key={"nameDown"} value={"title"}>
                Title Z-A
              </option>
              <option key={"yearUp"} value={"releaseDate_desc"}>
                Newest
              </option>
              <option key={"yearDown"} value={"releaseDate"}>
                Oldest
              </option>
            </select>
          </div>
        </div>

        <div className="favorites">
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="loaders"></div>
              ))
            : favorites.map((fav) => (
                <div key={fav.poster_path} className="fav">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                    alt={fav.original_title}
                  />
                  <div>
                    <div className="name">
                      <h1>{fav.title}</h1>
                      <h2>{fav.type}</h2>
                    </div>
                    <div className="ratings">
                      <h3>{fav.releaseDate.slice(0, 4)}</h3>
                      <h4>{fav.vote_average.toFixed(2)}</h4>
                    </div>
                  </div>
                  <div>
                    <PiBookmarkSimpleFill
                      className="bookmark"
                      onClick={() => deleteFavMovie(fav)}
                    />
                    <IoStarSharp className="star" />
                  </div>
                </div>
              ))}
        </div>
      </Content>
    </>
  );
};

export default Favorites;

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
const Content = styled.article`
  min-height: calc(100vh - 8rem);
  padding-top: 8rem;
  background-color: ${(props) => props.theme.pageBackground};
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    // padding-top: 10rem;
  }

  .selectBars {
    display: flex;
    width: calc(100% - 2rem);
    justify-content: flex-end;
    float: right;
    margin: 0;
    padding: 0;
    gap: 5rem;
    margin: 2rem;

    div {
      display: flex;
      height: 2rem;
      align-items: center;
      gap: 2rem;

      &:last-child {
        margin-right: 5em;
      }

      h3 {
        font-family: "Kadwa", sans-serif;
        font-weight: 100;
        font-size: 1.5rem;
        color: ${(props) => props.theme.color};
      }

      select {
        color: ${(props) => props.theme.color};
        width: 10rem;
        font-family: "Kadwa", sans-serif;
        font-weight: 100;
        font-size: 1.25rem;
        background-color: ${(props) => props.theme.componentsBackground};
        border: none;
        border-radius: 20px;
        border-right: 10px solid transparent;
        padding-left: 0.75rem;
      }
    }

    @media (max-width: 900px) {
      gap: 5vw;
      margin: 2rem 2vw;

      div {
        height: 5vw;
        gap: 0.5rem;

        &:last-child {
          margin-right: 2vw;
        }

        h3 {
          font-size: clamp(0.8rem, 3vw, 1.5rem);
        }

        select {
          color: ${(props) => props.theme.color};
          width: clamp(6rem, 25vw, 10rem);
          font-family: "Kadwa", sans-serif;
          font-weight: 100;
          font-size: clamp(0.5rem, 3vw, 1.25rem);
          background-color: ${(props) => props.theme.componentsBackground};
          border: none;
          border-radius: 20px;
          border-right: 10px solid transparent;
          padding-left: 0.75rem;
        }
      }
    }
  }

  .favorites {
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    margin: 1rem 0.4rem;
    justify-content: center;

    .loaders {
      display: flex;
      width: 23rem;
      height: 10rem;
      background-color: ${(props) => props.theme.componentsBackground};
      animation: ${loading} 2s;
      animation-iteration-count: infinite;
      border-radius: 10px;
      @media (max-width: 600px) {
        width: 24vw;
      }
    }

    .fav {
      box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
      border-radius: 0.5rem;
      display: flex;
      width: 23rem;
      height: 10rem;
      background-color: ${(props) => props.theme.componentsBackground};
      transition: 1s;
      &:hover {
        transform: scale(1.05);
      }

      .name {
        color: ${(props) => props.theme.color};
        width: 12rem;
        height: 7rem;
      }

      h1 {
        font-family: "Kadwa", sans-serif;
        font-weight: 100;
        margin: 0;
        padding: 0;
        margin-left: 10px;
        font-size: 1.5rem;
        height: 2.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      h2 {
        font-family: "Kufam", sans-serif;
        font-weight: 100;
        margin: 0;
        margin: 5px 0 0 10px;
        font-size: 0.75rem;
        filter: blur(50%);
        color: ${(props) => props.theme.colorSecondary};
      }
    }

    img {
      height: 10rem;
      border-radius: 0.5rem 0 0 0.5rem;
    }

    .bookmark {
      color: #ffe61b;
      font-size: 4rem;
      position: relative;
      bottom: 0.5rem;
      cursor: pointer;
    }
    .star {
      color: #ffe61b;
      position: relative;
      top: 3.65rem;
      left: 0.5rem;
      font-size: 1.75rem;
    }

    .ratings {
      color: ${(props) => props.theme.color};
      width: 12rem;
      height: 4rem;
      display: flex;
      justify-content: space-between;
      margin-left: 0.5rem;

      h3 {
        font-family: "Kadwa", sans-serif;
        font-weight: 100;
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colorSecondary};
      }

      h4 {
        font-family: "Kufam", sans-serif;
        font-weight: 100;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
      }
    }
  }
`;
