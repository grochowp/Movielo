import React from "react";
import { ImSpinner2 } from "react-icons/im";
import styled, { keyframes } from "styled-components";

export const Spinner: React.FC = () => {
  return (
    <Content>
      <ImSpinner2 />
    </Content>
  );
};

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.color};

  svg {
    height: 5rem;
    width: 5rem;
    animation: ${spin} 1.5s infinite linear;
  }
`;
