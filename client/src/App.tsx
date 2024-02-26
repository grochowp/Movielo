import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";
import { ModalProvider } from "./contexts/ModalContext";
import { useUser } from "./contexts/UserContext";
import Profile from "./pages/Profile/Profile";
import MainMenu from "./pages/MainMenu/MainMenu";
import Statistics from "./pages/Statistics/Statistics";
import Achievements from "./pages/Achievements/Achievements";
import Favorites from "./pages/Favorites/Favorites";
import Settings from "./pages/Settings/Settings";
import Nav from "./components/Nav";

interface Theme {
  bodyColor: string;
  pageBackground: string;
  componentsBackground: string;
  color: string;
  colorSecondary: string;
  colorOnHover: string;
  name: string;
}

const LightTheme: Theme = {
  bodyColor: "#D9D9D9",
  pageBackground: "#F9f6f8",
  componentsBackground: "#E1E1E1",
  color: "#393939",
  colorSecondary: "#363636",

  colorOnHover: "#000000",
  name: "light",
};

const DarkTheme: Theme = {
  bodyColor: "#393939",
  pageBackground: "#262626",
  componentsBackground: "#202020",
  color: "#D9D9D9",
  colorSecondary: "#C3C3C3",
  colorOnHover: "#ffffff",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [theme] = useState("dark");

  const user = useUser();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={""} />
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
              element={
                user.user ? (
                  <>
                    <Nav />
                    <Routes>
                      <Route path="profile" element={<Profile />} />
                      <Route path="statistics" element={<Statistics />} />
                      <Route path="favorites" element={<Favorites />} />
                      <Route path="achievements" element={<Achievements />} />
                      <Route path="settings" element={<Settings />} />
                    </Routes>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
