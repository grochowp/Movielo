import React from "react";
import styled from "styled-components";

const ProfileHeader: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Title>
      <p>{children}</p>
    </Title>
  );
};

export default ProfileHeader;

const Title = styled.article`
  position: absolute;
  top: 1rem;
  left: 10rem;

  width: clamp(30rem, 50vw, 50rem);
  height: 6rem;
  color: ${(props) => props.theme.color};
  display: flex;
  align-items: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-family: "Spline Sans", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.color};

  @media (max-width: 900px) {
    left: 0;
    top: 0;
    width: 100%;
  }

  @media (min-width: 1920px) {
    left: calc(50% - 50rem);
  }
  p {
    padding-left: 2rem;
  }
`;
