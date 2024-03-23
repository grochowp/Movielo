import styled from "styled-components";
import { MovieService } from "../../../services/movieService";
import { useEffect, useState } from "react";
import { Movie } from "../../../types";
import { IoStarSharp } from "react-icons/io5";

interface IRecent {
  userId?: string;
}

const Recent: React.FC<IRecent> = ({ userId }) => {
  const [recent, setRecent] = useState<Movie>();

  const fetchAndSetMovies = async () => {
    try {
      if (userId) {
        const response = await MovieService.getRecent(userId);

        setRecent(response.recentRating);
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
    <Content>
      <h1>Recently rated</h1>
      {recent && (
        <div className="recent">
          <img
            src={`https://image.tmdb.org/t/p/w500${recent.poster_path}`}
            alt={recent?.original_title}
          />
          <div>
            <div className="name">
              <h2>{recent.original_title}</h2>
              <h3>
                {recent.media_type === "tv" ? "series" : recent.media_type}
              </h3>
            </div>
            <div className="info">
              <div className="release">
                <h4>{recent?.release_date.slice(0, 4)}</h4>
              </div>
              <div className="ratings">
                <div>
                  <p>Avg. Rate</p>
                  <h5>
                    {recent.vote_average.toFixed(1)} <IoStarSharp />
                  </h5>
                </div>
                <div>
                  {" "}
                  <p>Your Rate</p>
                  <h5>
                    {recent.rating.toFixed(1)} <IoStarSharp />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Content>
  );
};

export default Recent;

const Content = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
  background: rgb(38, 27, 27);
  background: linear-gradient(
    129deg,
    rgba(38, 27, 27, 1) 0%,
    rgba(54, 45, 45, 1) 100%
  );
  height: clamp(12rem, 17vw, 15rem);
  border-radius: 10px;

  h1 {
    font-family: "Spline Sans", sans-serif;
    font-weight: 400;
    font-size: clamp(1.25rem, 1.75vw, 1.75rem);
    display: flex;
    align-items: center;
    height: 3rem;
    margin: 0;
    padding: 0.5rem 0 0 1.5rem;
    color: #e3e3e3;
  }

  .recent {
    height: max-content;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: clamp(0.5rem, 1vw, 1rem) clamp(1rem, 1.5vw, 1.5rem);

    .name {
      color: #e3e3e3;
      height: 60%;
    }

    h2 {
      font-family: "Kadwa", sans-serif;
      font-weight: 100;
      margin: 0;
      padding: 0;

      font-size: clamp(1rem, 1.5vw, 1.5rem);
      height: 2.5rem;
      white-space: nowrap;
      width: clamp(10rem, 15vw, 15rem);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h3 {
      font-family: "Kufam", sans-serif;
      font-weight: 100;
      margin: 0;
      font-size: clamp(0.5rem, 0.75vw, 0.75rem);
      filter: blur(50%);
      color: #757575;
    }

    img {
      height: clamp(6.5rem, 10vw, 9.5rem);
      border-radius: 0.5rem;
    }

    .info {
      color: #e3e3e3;
      width: clamp(10rem, 18vw, 20rem);
      display: flex;
      justify-content: space-between;

      .release {
        display: flex;
        // align-items: end;
      }

      .ratings {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.3rem;

          svg {
            margin-bottom: 0.5rem;
            color: #ffe61b;
          }
        }

        @media (max-width: 1050px) {
          gap: clamp(1rem, 5vw, 3rem);
        }
      }

      p {
        font-size: clamp(0.75rem, 1vw, 1rem);
        padding: 0;
        margin: 0;
      }
      h4 {
        font-family: "Kadwa", sans-serif;
        font-weight: 100;
        display: flex;
        align-items: center;
        color: #757575;
        margin: 0;
      }

      h5 {
        font-family: "Kufam", sans-serif;
        font-weight: 100;
        font-size: clamp(1rem, 1.5vw, 1.5rem);
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
      }
    }

    @media (max-width: 1051px) {
      .name,
      .info {
        width: 23rem;
      }
    }

    @media (max-width: 500px) {
      .name,
      .info {
        width: clamp(10rem, 55vw, 20rem);
      }
    }
  }
`;
