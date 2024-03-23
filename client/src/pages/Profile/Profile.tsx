import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import { MovieService } from "../../services/movieService";
import { useEffect, useState } from "react";
import { ITitle, Movie } from "../../types";
import StatsComp from "./components/Stats";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [series, setSeries] = useState<Array<Movie>>([]);

  const fetchAndSetMovies = async () => {
    try {
      if (user) {
        const movieResponse = await MovieService.findAllRated(
          user._id,
          "movie"
        );
        const seriesResponse = await MovieService.findAllRated(user._id, "tv");
        setMovies(movieResponse.data);
        setSeries(seriesResponse.data);
      }
    } catch (error) {
      console.error("Error while fetching movie data", error);
    }
  };

  useEffect(() => {
    fetchAndSetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user && (
        <>
          <Background
            className="background"
            src={`/images/bg-0.jpg`}
            alt={"Background photo of profile"}
          />
          <Photo>
            <img src={`${user.profilePicture}`} alt={"Profile picture"}></img>
            <section>
              <div className="name">
                {user.firstName} {user.lastName}
              </div>
              <div className="titles">
                {user.titles.map((title: ITitle) => (
                  <Link to="../achievements" key={title.name}>
                    <p>{title.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          </Photo>
          <Stats>
            <StatsComp data={movies}>Movies</StatsComp>
            <StatsComp data={series}>Series</StatsComp>
          </Stats>
        </>
      )}
    </>
  );
};

export default Profile;

const Background = styled.img`
  height: 35%;
  width: calc(100% - 5rem);
  position: absolute;
  z-index: -1;
  filter: opacity(30%);
  object-fit: cover;
  max-width: calc(1920px - 5rem);

  @media (max-width: 900px) {
    width: 100vw;
    height: 20%;
    min-height: 13rem;
  }
`;

const Photo = styled.article`
  display: flex;
  align-items: center;
  height: 35%;
  gap: 2rem;
  width: calc(100% - 5rem);
  background: transparent;
  color: ${(props) => props.theme.color};

  section {
    height: 10rem;
    width: 50%;
  }

  img {
    margin-left: 7vw;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
  }

  .name {
    font-size: 3.73rem;
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }

  .titles {
    display: flex;
    gap: 1.5rem;

    a {
      text-decoration: none;
    }
    p {
      width: max-content;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      padding: 0.5rem 1rem;
      border-radius: 16px;
      background-color: ${(props) => props.theme.color};
      color: ${(props) => props.theme.pageBackground};
      cursor: pointer;
    }
  }

  @media (max-width: 1300px) {
    height: clamp(10rem, 25vw, 35%);
    gap: 1rem;
    width: 100%;

    section {
      width: calc(100% - 30vw);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    img {
      margin-left: 7vw;
      width: 20vw;
      height: 20vw;
      min-width: 5rem;
      min-height: 5rem;
      padding: 1rem;
    }

    .name {
      font-size: clamp(1rem, 6vw, 4rem);
    }

    .titles {
      display: flex;
      gap: 0.5rem;
      font-size: clamp(0.5rem, 1.5vw, 2rem);

      p {
        font-family: "Inter", sans-serif;
        font-weight: 400;
        padding: 0.25rem 0.75rem;
      }
    }
  }
`;

const Stats = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65%;

  gap: 3rem;
  background-color: ${(props) => props.theme.pageBackground};

  @media (max-width: 1300px) {
    padding: 2rem;
    min-height: 75%;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: calc(77vh);
  }
`;
