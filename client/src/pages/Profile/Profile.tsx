import styled from "styled-components";
import { useUser } from "../../contexts/UserContext";
import { IoStarSharp } from "react-icons/io5";

const Profile: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          <Background
            className="background"
            src={`/images/bg-0.jpg`}
            alt={"a"}
          />
          <Photo>
            <img src={`/images/bg-1.jpg`} alt={"a"} />
            <section>
              <div className="name">
                {user.firstName} {user.lastName}
              </div>
              <div className="titles">
                <p>Title 1</p>
                <p>Titasdasdle 2</p>
                <p>Title 3</p>
              </div>
            </section>
          </Photo>
          <Stats>
            <section>
              <h1>Movies</h1>
              <article>
                <div>
                  <h2>Favorite</h2>
                  <p>
                    <img src={`/images/bg-2.jpg`} alt={"a"} />
                    <div>
                      <h3>John Wick 3 - Parraleum</h3>
                      <h4>Year</h4>
                    </div>
                  </p>
                </div>

                <div>
                  <h2>Favorite genres</h2>
                  <ul>
                    <li>
                      1. drama <span>aaa</span>
                    </li>
                    <li>
                      2. drama <span>aaa</span>
                    </li>
                    <li>
                      3. drama <span>aaa</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2> Avg. rate</h2>
                  <h3 className="rate">
                    8,1{" "}
                    <span>
                      <IoStarSharp />
                    </span>
                  </h3>
                </div>
                <div>
                  <h2>Total rated</h2>
                  <h3 className="rate">152</h3>
                </div>
              </article>
            </section>

            <section>
              <h1>Series</h1>
              <article>
                <div>
                  <h2>Favorite</h2>
                  <p>
                    <img src={`/images/bg-2.jpg`} alt={"a"} />
                    <div>
                      <h3>John Wick 3 - Parraleum</h3>
                      <h4>Year</h4>
                    </div>
                  </p>
                </div>

                <div>
                  <h2>Favorite genres</h2>
                  <ul>
                    <li>
                      1. drama <span>aaa</span>
                    </li>
                    <li>
                      2. drama <span>aaa</span>
                    </li>
                    <li>
                      3. drama <span>aaa</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2> Avg. rate</h2>
                  <h3 className="rate">
                    8,1{" "}
                    <span>
                      <IoStarSharp />
                    </span>
                  </h3>
                </div>
                <div>
                  <h2>Total rated</h2>
                  <h3 className="rate">152</h3>
                </div>
              </article>
            </section>
          </Stats>
        </>
      )}
    </>
  );
};

export default Profile;

const Background = styled.img`
  height: 35%;
  width: calc(100% - 7rem);
  position: absolute;
  z-index: -1;
  filter: opacity(30%);
  object-fit: cover;
  max-width: calc(1920px - 7rem);

  @media (max-width: 900px) {
    width: 100vw;
  }
`;

const Photo = styled.article`
  display: flex;
  align-items: center;
  height: 35%;
  gap: 2rem;
  width: calc(100% - 7rem);
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

    p {
      width: max-content;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      padding: 0.5rem 1rem;
      border-radius: 16px;
      background-color: yellow;
      color: #262626;
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
  height: 65%;
  gap: 3rem;
  background-color: ${(props) => props.theme.pageBackground};

  section {
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

    p {
      display: flex;
      gap: 1rem;
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
    }

    li {
      padding-bottom: 1rem;
      font-family: "Kanit", sans-serif;
      font-weight: 200;
      span {
        float: right;
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

  @media (max-width: 1300px) {
    height: max-content;
    padding: 2rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    height: max-content;
  }
`;
