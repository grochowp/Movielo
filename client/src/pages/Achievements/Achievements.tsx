import styled, { keyframes } from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { AchievementsService } from "../../services/achievementsService";
import { useUser } from "../../contexts/UserContext";
import ProgressBar from "./components/ProgressBar";

interface IAchievement {
  name: string;
  title?: string;
  tier: number;
  text: string;
  points: number;
  type: string;
  requirements: number;
}

const Achievements: React.FC = () => {
  const [type, setType] = useState<string>("All");
  const [display, setDisplay] = useState<string>("All");
  const [data, setData] = useState<IAchievement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();
  const counts = {
    movie: 0,
    tv: 0,
  };

  user?.ratings.forEach((rating) => {
    if (rating.type === "movie") {
      counts.movie++;
    } else if (rating.type === "tv") {
      counts.tv++;
    }
  });

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      try {
        const response = await AchievementsService.getAchievements(
          type,
          display,
          user?.achievements
        );

        setData(response.achievements);
        setIsLoading(false);
      } catch (error) {
        console.error("Error while fetching movie data", error);
      }
    };
    fetchAndSetMovies();
  }, [type, display, user?.achievements]);

  return (
    <>
      <ProfileHeader>Achievements</ProfileHeader>
      <Content>
        <div className="info">
          <div className="select">
            <div>
              <SelectSpan
                selected={type === "All"}
                onClick={() => setType("All")}
              >
                All
              </SelectSpan>
              <SelectSpan
                selected={type === "Movies"}
                onClick={() => setType("Movies")}
              >
                Movies
              </SelectSpan>
              <SelectSpan
                selected={type === "Series"}
                onClick={() => setType("Series")}
              >
                Series
              </SelectSpan>
            </div>
            <div>
              <SelectSpan
                selected={display === "All"}
                onClick={() => setDisplay("All")}
              >
                All
              </SelectSpan>
              <SelectSpan
                selected={display === "Completed"}
                onClick={() => setDisplay("Completed")}
              >
                Completed
              </SelectSpan>
              <SelectSpan
                selected={display === "In progress"}
                onClick={() => setDisplay("In progress")}
              >
                In progress
              </SelectSpan>
            </div>
          </div>
          <div>Total points: {user?.points}</div>
        </div>

        {isLoading
          ? Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="loaders"></div>
            ))
          : data.map((achievement) => (
              <div key={achievement.name} className="achievement">
                <div
                  style={{
                    borderColor:
                      achievement.tier === 1
                        ? "green"
                        : achievement.tier === 2
                        ? "yellow"
                        : "red",
                  }}
                  className="tier"
                >
                  {achievement.tier}
                </div>
                <div className="title">
                  <h1>
                    {achievement.name}{" "}
                    {achievement?.title && (
                      <span>
                        <IoTrophyOutline /> {achievement?.title}
                      </span>
                    )}
                  </h1>
                  <h2>{achievement.text}</h2>
                </div>
                <div className="type">{achievement.type}</div>
                <div className="state">
                  {user?.achievements.includes(achievement.name) ? (
                    <IoIosCheckmarkCircle />
                  ) : achievement.requirements ? (
                    <ProgressBar
                      completed={(
                        (counts[
                          achievement.type === "Series" ? "tv" : "movie"
                        ] /
                          achievement.requirements) *
                        100
                      ).toFixed(1)}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  style={{
                    color: user?.achievements.includes(achievement.name)
                      ? "green"
                      : "",
                  }}
                  className="points"
                >
                  +{achievement.points}p
                </div>
              </div>
            ))}
      </Content>
    </>
  );
};

export default Achievements;

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

interface SelectSpanProps {
  selected: boolean;
}

const SelectSpan = styled.span<SelectSpanProps>`
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.color : props.theme.colorSecondary};
`;

const Content = styled.article`
  min-height: calc(100vh - 11rem);
  width: calc(100vw - 7rem);

  max-width: 1920px;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.color};
  padding-top: 10rem;
  padding-bottom: 1rem;

  @media (max-width: 900px) {
    width: 100vw;
    padding-top: 8rem;
  }

  .info {
    padding: 0 clamp(2rem, 4.5vw, 5rem);
    font-size: clamp(1rem, 1.25vw, 1.5rem);
    font-family: "Kufam", sans-serif;
    display: flex;
    justify-content: space-between;

    .select {
      display: flex;
      gap: clamp(5rem, 8vw, 10rem);
      color: ${(props) => props.theme.colorSecondary};

      div {
        display: flex;
        gap: 1rem 2rem;

        span {
          cursor: pointer;
        }
      }
    }

    @media (max-width: 900px) {
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      font-size: clamp(1rem, 4vw, 1.5rem);

      .select {
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 1rem 2rem;
      }
    }
  }

  .loaders {
    height: 7rem;
    margin: 2rem 5rem;
    background-color: ${(props) => props.theme.componentsBackground};
    animation: ${loading} 2s;
    animation-iteration-count: infinite;

    @media (max-width: 900px) {
      margin: 2rem 0.5rem;
    }
  }

  .achievement {
    background-color: ${(props) => props.theme.componentsBackground};
    margin: 2rem 5rem;
    height: clamp(5rem, 7vw, 5rem);
    display: flex;
    border-radius: 5px;
    box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
    transition: 1s;

    @media (max-width: 900px) {
      margin: 2rem 0.5rem;
    }

    &:hover {
      transform: scale(1.01);
    }

    .tier {
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border: 1px solid black;
      border-radius: 50%;
      margin: 1rem;

      @media (max-width: 600px) {
        display: none;
      }
    }

    .title {
      width: clamp(15rem, 45vw, 50rem);
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        font-size: clamp(1rem, 2vw, 2rem);
        margin: 0;
        margin-top: 5px;
        font-family: "Spline Sans", sans-serif;
        font-weight: 400;

        span {
          margin-left: 1rem;
          font-size: clamp(0.65rem, 1vw, 1rem);
          color: ${(props) => props.theme.colorSecondary};
        }

        @media (max-width: 500px) {
          display: flex;
          flex-direction: column;

          span {
            margin-left: 0;
          }
        }
      }

      h2 {
        font-family: "Kufam", sans-serif;
        font-weight: 100;
        font-size: clamp(0.65rem, 1vw, 1rem);
        color: ${(props) => props.theme.colorSecondary};
      }
    }

    .type {
      width: clamp(5rem, 9vw, 10rem);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(1rem, 1.25vw, 1.25rem);
      margin: 0;
      margin-left: 1rem;
      padding: 0;
      color: ${(props) => props.theme.colorSecondary};

      @media (max-width: 450px) {
        display: none;
      }
    }

    .state {
      width: clamp(20rem, 20vw, 30rem);
      color: green;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: clamp(1.5rem, 3vw, 3rem);
      }

      @media (max-width: 900px) {
        width: clamp(7rem, 20vw, 30rem);
      }
    }

    .points {
      display: flex;
      width: clamp(5rem, 10vw, 11rem);
      color: ${(props) => props.theme.colorSecondary};
      justify-content: center;
      align-items: center;
      font-size: clamp(1.25rem, 2vw, 1.75rem);

      @media (max-width: 400px) {
        margin-right: 0.5rem;
      }
    }
  }
`;
