import React from "react";
import styled from "styled-components";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegChartBar } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { CiSettings, CiTrophy } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProfileNav: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <NavBar>
      <NavSection>
        <IoHomeOutline onClick={() => navigate("/main")} />
      </NavSection>
      <NavSection>
        <CgProfile onClick={() => navigate("profile")} />
        <FaRegChartBar onClick={() => navigate("statistics")} />
        <BsBookmarkStar onClick={() => navigate("favorites")} />
        <CiTrophy onClick={() => navigate("achievements")} />
        <CiSettings onClick={() => navigate("settings")} />
      </NavSection>
      <NavSection>
        <AiOutlineLogout
          style={{ color: "red" }}
          onClick={() => user.setUser(null)}
        />
      </NavSection>
    </NavBar>
  );
};

export default ProfileNav;

const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  height: 100vh;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.componentsBackground};
  color: ${(props) => props.theme.color};

  @media (max-width: 900px) {
    width: 100vw;
    height: 3.5rem;
    flex-direction: row;
    position: fixed;
    bottom: 0rem;
    border-top: 2px solid ${(props) => props.theme.pageBackground};
    z-index: 1;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:first-child {
    margin-top: 2rem;
  }

  &:last-child {
    margin-bottom: 2rem;
  }

  svg {
    font-size: 2rem;
    width: 5rem;
    padding: 1rem;
    transition: 1s;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.color};
      color: ${(props) => props.theme.componentsBackground};
    }
  }

  @media (max-width: 900px) {
    flex-direction: row;
    gap: 0.25rem;
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      font-size: clamp(1.25rem, 3vw, 2rem);
      width: 2rem;
      padding: clamp(0.25rem, 1.5vw, 1.25rem);
      transition: 1s;
      cursor: pointer;
    }
  }
`;
