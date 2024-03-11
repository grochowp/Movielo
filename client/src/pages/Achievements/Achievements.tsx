import styled from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";

const Achievements: React.FC = () => {
  const achievements = useMemo(
    () => [
      {
        name: "aaasd asd asd aa",
        tier: 1,
        text: "aaaa dsadsa dsa dass dd sadas dasd asd asdasas asd sadasd asdas dasa",
        type: "Movies",
        points: 10,
      },
      {
        name: "aa12a",
        title: "bbb",
        tier: 1,
        text: "aaaaa",
        type: "Movies",
        points: 10,
      },
      { name: "aasa", tier: 1, text: "aaaaa", type: "Movies", points: 10 },
      { name: "abaa", tier: 1, text: "aaaaa", type: "Movies", points: 10 },
      { name: "aana", tier: 1, text: "aaaaa", type: "Series", points: 10 },
      { name: "aaba", tier: 1, text: "aaaaa", type: "Series", points: 10 },
      { name: "aznaa", tier: 1, text: "aaaaa", type: "Series", points: 10 },
      { name: "aaaa", tier: 1, text: "aaaaa", type: "Series", points: 10 },
      { name: "a,aa", tier: 1, text: "aaaaa", type: "Movies", points: 10 },
    ],
    []
  );

  const [type, setType] = useState<string>("All");
  const [ach, setAch] = useState(achievements);

  useEffect(() => {
    if (type == "All") setAch(achievements);
    else setAch(() => achievements.filter((ac) => ac.type === type));
  }, [type, achievements]);

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
              <span>All</span>
              <span>Completed</span>
              <span>In progress</span>
            </div>
          </div>
          <div>Total points: 100</div>
        </div>

        {ach.map((achiev) => (
          <div key={achiev.name} className="achievement">
            <div className="tier">{achiev.tier}</div>
            <div className="title">
              <h1>
                {achiev.name}{" "}
                {achiev?.title && (
                  <span>
                    <IoTrophyOutline /> {achiev?.title}
                  </span>
                )}
              </h1>
              <h2>{achiev.text}</h2>
            </div>
            <div className="type">{achiev.type}</div>
            <div className="state">
              <IoIosCheckmarkCircle />
            </div>
            <div className="points">+{achiev.points}p</div>
          </div>
        ))}
      </Content>
    </>
  );
};

export default Achievements;
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

  .achievement {
    height: max-content;
    background-color: ${(props) => props.theme.componentsBackground};
    margin: 2rem 5rem;
    height: 7rem;
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
      width: clamp(20rem, 45vw, 50rem);
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        font-size: clamp(1.25rem, 2vw, 2rem);
        margin: 0;
        margin-top: 5px;
        font-family: "Spline Sans", sans-serif;
        font-weight: 400;

        span {
          margin-left: 1rem;
          font-size: clamp(0.75rem, 1vw, 1rem);
          color: ${(props) => props.theme.colorSecondary};
        }
      }

      h2 {
        font-family: "Kufam", sans-serif;
        font-weight: 100;
        font-size: clamp(0.75rem, 1vw, 1rem);
        color: ${(props) => props.theme.colorSecondary};
      }
    }

    .type {
      width: clamp(5rem, 9vw, 10rem);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin: 0;
      margin-left: 1rem;
      padding: 0;
      color: ${(props) => props.theme.colorSecondary};
    }

    .state {
      width: clamp(7rem, 20vw, 30rem);
      color: green;
      display: flex;
      font-size: 3rem;
      justify-content: center;
      align-items: center;
    }

    .points {
      display: flex;
      width: clamp(5rem, 10vw, 11rem);
      color: ${(props) => props.theme.colorSecondary};
      justify-content: center;
      align-items: center;
      font-size: clamp(1.5rem, 2vw, 1.75rem);
    }
  }
`;
