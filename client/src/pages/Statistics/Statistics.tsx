import styled from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { IoStarOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { PiPopcornThin } from "react-icons/pi";

const Statistics: React.FC = () => {
  return (
    <>
      <ProfileHeader>Statistics</ProfileHeader>
      <Content>
        <div className="left">
          <StatsComponents>
            <div className="stats">
              <div>
                <h1>125</h1>
                <PiPopcornThin />
              </div>
              <h2>Total ratings</h2>
            </div>
            <div className="stats">
              <div>
                <h1>7,3</h1>
                <IoStarOutline />
              </div>
              <h2>Average rating</h2>
            </div>
            <div className="stats">
              <div>
                <h1>300p</h1>
                <CiTrophy />
              </div>
              <h2>Points</h2>
            </div>
            <div className="stats">
              <div>
                <h1>3rd</h1>
                <CiTrophy />
              </div>
              <h2>Ranking</h2>
            </div>
          </StatsComponents>
          <div className="graph"></div>
        </div>
        <div className="right">
          <div className="to-do"></div>
          <div className="recent"></div>
        </div>
      </Content>
    </>
  );
};

export default Statistics;

const Content = styled.article`
  max-width: calc(1920px - 7rem);
  width: calc(100vw - 7rem);
  min-height: calc(100vh - 6rem);
  padding-top: 6rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.pageBackground};

  @media (max-width: 900px) {
    width: 100vw;
  }

  .left {
    margin: 3rem;
    height: max-content;
    min-width: 30rem;
    width: calc(85% - 30rem);
    margin-right: 1rem;

    @media (max-width: 900px) {
      margin: 3rem 0;
    }
    @media (max-width: 500px) {
      min-width: 0;
      margin: 1rem;
      width: 100%;
    }
    .graph {
      box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};

      background-color: ${(props) => props.theme.componentsBackground};
      height: clamp(20rem, 39vw, 37rem);
      border-radius: 10px;

      @media (max-width: 500px) {
        height: 60vw;
      }
    }
  }

  .right {
    margin: 3rem;
    width: clamp(10rem, 30vw, 30rem);
    height: max-content;
    margin-right: 1rem;

    @media (max-width: 1051px) {
      width: 30rem;
      margin-top: 0;
    }

    @media (max-width: 900px) {
      margin: 1rem 0;
    }

    @media (max-width: 500px) {
      margin: 0 1rem 1rem 1rem;
    }

    .to-do {
      box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
      background-color: ${(props) => props.theme.componentsBackground};
      margin-bottom: 2rem;
      height: clamp(15rem, 27vw, 27rem);
      border-radius: 10px;
    }

    .recent {
      box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
      background-color: ${(props) => props.theme.componentsBackground};
      height: clamp(8.5rem, 18vw, 17rem);
      border-radius: 10px;
    }
  }
`;

const StatsComponents = styled.div`
  margin-bottom: 2rem;
  height: max-content;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #d9d9d9;

  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    justify-content: space-around;
  }

  .stats {
    box-shadow: 0px 0px 10px ${(props) => props.theme.boxShadow};
    width: clamp(10rem, 13vw, 20rem);
    height: clamp(4rem, 6vw, 7rem);
    border-radius: 10px;

    &:nth-child(1) {
      background: rgb(30, 27, 158);
      background: linear-gradient(
        129deg,
        rgba(30, 27, 158, 1) 0%,
        rgba(46, 46, 122, 1) 50%,
        rgba(16, 15, 69, 1) 100%
      );
    }
    &:nth-child(2) {
      background: rgb(26, 133, 39);
      background: linear-gradient(
        129deg,
        rgba(26, 133, 39, 1) 8%,
        rgba(46, 122, 50, 1) 50%,
        rgba(15, 69, 20, 1) 100%
      );
    }
    &:nth-child(3) {
      background: rgb(133, 26, 26);
      background: linear-gradient(
        129deg,
        rgba(133, 26, 26, 1) 8%,
        rgba(122, 46, 46, 1) 50%,
        rgba(69, 15, 15, 1) 100%
      );
    }
    &:nth-child(4) {
      background: rgb(131, 133, 26);
      background: linear-gradient(
        129deg,
        rgba(131, 133, 26, 1) 8%,
        rgba(121, 122, 46, 1) 50%,
        rgba(68, 69, 15, 1) 100%
      );
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: clamp(1.5rem, 1.75vw, 2rem);

      h1 {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        margin: 0.5vw 0 0 0.75rem;
      }
      svg {
        margin: 0.5vw 0.75rem 0 0;
      }
    }

    h2 {
      font-family: "Spline Sans", sans-serif;
      font-weight: 300;
      font-size: clamp(0.5rem, 1vw, 1.25rem);
      margin: 1.25vw 0 0 1rem;

      @media (max-width: 900px) {
        margin: 0.75rem 0 0 0.75rem;
        font-size: 0.65rem;
      }

      @media (max-width: 500px) {
        font-size: 0.75rem;
      }
    }
  }
`;
