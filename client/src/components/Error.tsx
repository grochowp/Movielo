import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <ErrorMessage>
        <h1>Page not found</h1>
        <button onClick={handleClick}>GO BACK</button>
      </ErrorMessage>
    </>
  );
};

export default Error;

const ErrorMessage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.pageBackground};

  h1 {
    font-family: "Inter", sans-serif;
    color: ${(props) => props.theme.color};
  }

  button {
    font-family: "Inter", sans-serif;

    width: 10rem;
    height: 3rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.pageBackground};
    font-size: 1rem;
    cursor: pointer;
    border: 2px solid yellow;
  }
`;
