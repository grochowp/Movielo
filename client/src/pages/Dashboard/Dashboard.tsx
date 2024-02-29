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

const Content = styled.div`
  width: calc(100vw - 7rem);
  height: 100vh;
  // background-color: red;
`;
