import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import { ModalProvider } from "./contexts/ModalContext";
import { useUser } from "./contexts/UserContext";
import MainMenu from "./pages/MainMenu/MainMenu";
import Dashboard from "./pages/Dashboard/Dashboard";

import Profile from "./pages/Profile/Profile";
import Statistics from "./pages/Statistics/Statistics";
import Favorites from "./pages/Favorites/Favorites";
import Achievements from "./pages/Achievements/Achievements";
import Settings from "./pages/Settings/Settings";

interface Theme {
  bodyColor: string;
  pageBackground: string;
  componentsBackground: string;
  color: string;
  colorSecondary: string;
  boxShadow: string;
  name: string;
}

const LightTheme: Theme = {
  bodyColor: "#B0ACAB",
  pageBackground: "#e0e0e0",
  componentsBackground: "#cfd8dc ", // bdbdbd
  color: "#393939",
  colorSecondary: "#363636",
  boxShadow: "rgba(0, 0, 0, 0.3)",
  name: "light",
};

const DarkTheme: Theme = {
  bodyColor: "#393939",
  pageBackground: "#121217",
  componentsBackground: "#292938",
  color: "#E3E3E3",
  colorSecondary: "#B6B6B6",
  boxShadow: "rgba(0, 0, 0, 0.5)",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  const user = useUser();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="login" />} />
            <Route
              path="/login"
              element={user.user ? <Navigate to="/main" /> : <LoginPage />}
            />
            <Route
              path="/main"
              element={user.user ? <MainMenu /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard/*"
              element={user.user ? <Dashboard /> : <Navigate to="/login" />}
            >
              <Route path="profile" element={<Profile />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="achievements" element={<Achievements />} />
              <Route
                path="settings"
                element={<Settings theme={theme} setTheme={setTheme} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
