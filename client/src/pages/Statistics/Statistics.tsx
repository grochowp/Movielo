import styled from "styled-components";
import ProfileHeader from "../../components/ProfileHeader";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { MovieService } from "../../services/movieService";
import { Movie } from "../../types";
import SingleStats from "./components/SingleStats";
import Graph from "./components/Graph";
import Recent from "./components/Recent";

const Statistics: React.FC = () => {
  const { user } = useUser();
  const [data, setData] = useState<Array<Movie>>([]);
  const [type, setType] = useState<string>("All");

  const ratingsCounted = Array.from(
    { length: 10 },
    (_, index) => index + 1
  ).map((rate) => ({
    name: rate,
    ratings: 0,
  }));

  data.forEach((item) => {
    const rate = item.rating;
    ratingsCounted[rate - 1].ratings++;
  });

  const fetchAndSetMovies = async () => {
    try {
      if (user) {
        const response = await MovieService.findAllRated(user._id, type);
        setData(response.data);
      }
    } catch (error) {
      console.error("Error while fetching movie data", error);
    }
  };

  useEffect(() => {
    fetchAndSetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <>
      <ProfileHeader>Statistics</ProfileHeader>
      <Content>
        <div className="left">
          <SingleStats data={data} />
          <Graph ratings={ratingsCounted} type={type} onChangeType={setType} />
        </div>
        <div className="right">
          <div className="to-do"></div>
          <Recent userId={user?._id} />
        </div>
      </Content>
    </>
  );
};

export default Statistics;

const Content = styled.article`
  max-width: calc(1920px - 5rem);
  width: calc(100vw - 5rem);
  min-height: calc(100vh - 6rem);
  padding-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
      height: clamp(15rem, 28vw, 29rem);
      border-radius: 10px;
    }
  }
`;
