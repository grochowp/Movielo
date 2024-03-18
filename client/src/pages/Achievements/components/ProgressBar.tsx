import React from "react";
import styled from "styled-components";

interface ProgressBarProps {
  completed: string;
}

const Container = styled.div`
  height: 20px;
  width: clamp(5rem, 7vw, 15rem);
  padding: 0;
  margin: 0;
  background-color: #e0e0de;

  border-radius: 50px;
  margin: 50px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Filler = styled.div<{ completed: string }>`
  height: 100%;
  width: ${(props) => props.completed}%;
  background-color: orange;
  border-radius: inherit;
  text-align: right;
`;

const Label = styled.span`
  padding: 5px;
  color: ${(props) => props.theme.componentsBackground};
  font-weight: bold;
  font-size: 0.75rem;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ completed }) => (
  <Container>
    <Filler completed={completed}>
      <Label>{`${completed}%`}</Label>
    </Filler>
  </Container>
);

export default ProgressBar;
