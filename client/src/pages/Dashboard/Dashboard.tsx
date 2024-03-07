import React from "react";
import ProfileNav from "../../components/ProfileNav";
import { Outlet } from "react-router-dom";

import styled from "styled-components";

const Dashboard: React.FC = () => {
  return (
    <Dashb>
      <ProfileNav />
      <Content>
        <Outlet />
      </Content>
    </Dashb>
  );
};

export default Dashboard;

const Dashb = styled.section`
  display: flex;
  width: 100vw;
  max-width: 1920px;
`;

const Content = styled.section`
  width: calc(100vw - 7rem);
  height: 100vh;
  min-height: max-content;
  margin-left: 7rem;

  @media (max-width: 900px) {
    width: 100vw;
    margin-left: 0;
    height: max-content;
    padding-bottom: 3.5rem;
  }
`;
