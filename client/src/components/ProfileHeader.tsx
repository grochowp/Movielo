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
  width: 100%;
  height: 6rem;
  padding-top: 0.5rem;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.color};
  display: flex;
  align-items: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-family: "Kufam", sans-serif;
  border-bottom: 2px solid ${(props) => props.theme.componentsBackground};

  p {
    padding-left: 2rem;
  }
`;
