import React from "react";
import ProfileNav from "./ProfileNav";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Statistics from "../pages/Statistics/Statistics";
import Favorites from "../pages/Favorites/Favorites";
import Achievements from "../pages/Achievements/Achievements";
import Settings from "../pages/Settings/Settings";
import styled from "styled-components";

const Dashboard: React.FC = () => {
  return (
    <Dashb>
      <ProfileNav />
      <article>
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </article>
    </Dashb>
  );
};

export default Dashboard;

const Dashb = styled.section`
  display: flex;
  width: 100vw;
  max-width: 1920px;
`;
