import { useEffect, useState } from "react";
import { Movie } from "../../../types";
import { API_KEY, MOVIE_ID } from "../../../utils";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchData() {
      const moviesData = [];
      for (let i = 0; i < MOVIE_ID.length; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${MOVIE_ID[i]}?api_key=${API_KEY}`
        );
        const movieData = await response.json();
        moviesData.push(movieData);
      }
      setMovies(moviesData);
    }

    fetchData();
  }, []);

  return (
    <MainPage>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img src={`/images/bg-${index}.jpg`} alt={movie.original_title} />
            <div>
              <h1>
                {movie.original_title}
                <span onClick={() => console.log(movie.id)}>
                  <IoIosInformationCircleOutline />
                </span>
              </h1>
              <p>{movie.overview}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </MainPage>
  );
};
export default Main;

const MainPage = styled.section`
  max-height: 1080px;
  background-color: ${(props) => props.theme.pageBackground};

  .swiper {
    max-width: 1920px;
    width: 100vw;
    max-height: 1080px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 8px;
    position: relative; 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;]
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: opacity(50%);
  }

  .swiper-slide div {
    position: absolute;
    max-width: 800px;
    width: 40vw;
    text-align: left;
    top: 60%;
    left: 30%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.color};
  }
  h1 {
    width: 100vw;
    font-family: "Kadwa", sans-serif;
    font-weight: 100;
    font-size: 4.5rem;

    @media (max-width: 1200px) {
      font-size: 6vw;
    }
  }

  p {
    width: 40vw;
    max-width: 800px;
    position: absolute;
    left: 50%;
    font-size: 1.05rem;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.color};
    font-family: "Inika", serif;
    font-weight: 100;

    @media (max-width: 1200px) {
      font-size: 1.25vw;
    }
  }

  span {
    margin-left: 2rem;
    position: absolute;
    top: 35%;
    font-size: 3rem;
    cursor: pointer;

    @media (max-width: 1200px) {
      margin-left: 3vw;
      font-size: 4vw;
    }
  }
`;
