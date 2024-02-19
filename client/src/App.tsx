import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { MainMenu } from "./pages/MainMenu/MainMenu";
import { Navigate } from "react-router-dom";
import { User } from "./types";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./globalStyles";

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
  color: "#C3C3C3",
  colorSecondary: "#D9D9D9",
  colorOnHover: "#ffffff",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />
            }
          />
          <Route
            path="/"
            element={user ? <MainMenu user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
