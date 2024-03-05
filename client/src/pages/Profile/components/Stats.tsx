import { IoStarSharp } from "react-icons/io5";
import { Movie } from "../../../types";
import styled from "styled-components";

interface IProps {
  children: string;
  data: Array<Movie>;
}

const StatsComp: React.FC<IProps> = ({ children, data }) => {
  return (
    <Sect>
      <h1>{children}</h1>
      <article>
        <div>
          <h2>Favorite</h2>
          <p>
            <img src={`/images/bg-2.jpg`} alt={"a"} />
            <div className="titleYear">
              <h3>Dune</h3>
              <h4>Year</h4>
            </div>
          </p>
        </div>

        <div>
          <h2>Recent ratings</h2>
          <ul>
            {data
              .slice()
              .reverse()
              .slice(0, 3)
              .map((movie, index) => (
                <div>
                  <li key={index + 1}>{movie.title}</li>
                  <span>{movie.rating}</span>
                </div>
              ))}
          </ul>
        </div>
        <div>
          <h2> Avg. rate</h2>
          <h3 className="rate">
            {data.length > 0
              ? (
                  data.reduce((sum, movie) => sum + movie.rating, 0) /
                  data.length
                ).toFixed(2)
              : 0}
            <span>
              <IoStarSharp />
            </span>
          </h3>
        </div>
        <div>
          <h2>Total rated</h2>
          <h3 className="rate">{data.length}</h3>
        </div>
      </article>
    </Sect>
  );
};

export default StatsComp;

const Sect = styled.section`
  min-height: max-content;
  border-radius: 1rem;
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25rem;
  background-color: ${(props) => props.theme.componentsBackground};
  color: ${(props) => props.theme.color};
  font-family: "Kadwa", sans-serif;
  gap: 1rem;
  line-height: 1.3;

  @media (max-width: 1300px) {
    width: 20rem;
    height: max-content;
  }

  @media (max-width: 900px) {
    width: 35rem;
    height: 22.5rem;

    &:first-child {
      margin-top: 2rem;
    }

    &:last-child {
      margin-bottom: 6rem;
    }
  }

  @media (max-width: 570px) {
    height: max-content;
    width: clamp(20rem, 60vw, 35rem);
  }

  h1 {
    font-weight: 100;
    font-size: 1.75rem;
    margin: 0;
    height: 15%;
    display: flex;
    align-items: center;

    @media (max-width: 1300px) {
      font-size: clamp(1.25rem, 2vw, 1.75rem);
      margin-top: 1rem;
    }
  }

  article {
    height: 85%;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    justify-content: space-around;
    width: 95%;
    gap: 20px;

    @media (max-width: 1300px) {
      grid-template-columns: auto;
    }

    @media (max-width: 900px) {
      grid-template-columns: auto auto;
    }

    @media (max-width: 570px) {
      grid-template-columns: auto;
    }

    div {
      height: 80%;
      width: 15rem;
    }

    .titleYear h3 {
      justify-content: left;
    }

    p {
      display: flex;
      gap: 1rem;

      width: 100%;
      margin-left: 1rem;
      justify-content: center;
      align-items: center;
    }

    img {
      margin-left: 0.5rem;
      width: 4rem;
      height: 6rem;
      border-radius: 0.5rem;
    }

    ul {
      list-style: none;
      width: 70%;

      div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        height: max-content;
        gap: 1rem;
        padding-bottom: 0.5rem;
      }
      li {
        font-family: "Kanit", sans-serif;
        font-weight: 200;
      }

      span {
        float: right;
        font-weight: 500;
      }
    }

    h2,
    h3 {
      font-weight: 100;
      display: flex;
      justify-content: center;
    }

    h2 {
      font-family: "Kanit", sans-serif;
      font-weight: 200;
      position: relative;
      margin: 0;
      font-size: 1.35rem;
    }

    h2:after {
      content: "";
      position: absolute;
      left: 2rem;
      bottom: -0.3rem;
      width: 75%;
      border-bottom: 0.1rem solid ${(props) => props.theme.color};
    }

    h3 {
      font-size: 1rem;
      width: 110%;
      font-family: "Kanit", sans-serif;
      font-weight: 400;

      span {
        margin-top: 0.1rem;
      }
    }

    .rate {
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 2rem;
      font-family: "Kanit", sans-serif;
      font-weight: 300;
      width: 100%;
    }

    h4 {
      font-size: 0.75rem;
      color: ${(props) => props.theme.colorSecondary};
      font-family: "Kanit", sans-serif;
      font-weight: 200;
    }
  }
`;
