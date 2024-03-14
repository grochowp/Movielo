import styled from "styled-components";
import { IoStarOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { PiPopcornThin } from "react-icons/pi";
import { useUser } from "../../contexts/UserContext";
import { Movie } from "../../types";

interface ISingleStats {
  data: Array<Movie>;
}

const SingleStats: React.FC<ISingleStats> = ({ data }) => {
  const { user } = useUser();

  return (
    <StatsComponents>
      <div className="stats">
        <div>
          <h1>{data.length}</h1>
          <PiPopcornThin />
        </div>
        <h2>Total ratings</h2>
      </div>
      <div className="stats">
        <div>
          <h1>
            {data.length > 0
              ? (
                  data.reduce((sum, movie) => sum + movie.rating, 0) /
                  data.length
                ).toFixed(2)
              : 0}
          </h1>
          <IoStarOutline />
        </div>
        <h2>Average rating</h2>
      </div>
      <div className="stats">
        <div>
          <h1>{user?.points}p</h1>
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
  );
};

export default SingleStats;

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
      height: 60%;

      h1 {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        margin: 0 0 0 1rem;
      }
      svg {
        margin: 0 1rem 0 0;
      }
    }

    h2 {
      font-family: "Spline Sans", sans-serif;
      font-weight: 300;
      font-size: clamp(0.5rem, 1vw, 1.25rem);

      margin: 0.25rem 0 0 1rem;

      @media (max-width: 900px) {
        font-size: 0.65rem;
      }

      @media (max-width: 500px) {
        font-size: 0.75rem;
      }
    }
  }
`;
