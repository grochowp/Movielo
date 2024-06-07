import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "./contexts/ModalContext";
import { useUser } from "./contexts/UserContext";
import GlobalStyle from "./globalStyles";
// import { LoginPage } from "./pages/Login/LoginPage";
// import MainMenu from "./pages/MainMenu/MainMenu";
// import Dashboard from "./pages/Dashboard/Dashboard";

// import Profile from "./pages/Profile/Profile";
// import Statistics from "./pages/Statistics/Statistics";
// import Favorites from "./pages/Favorites/Favorites";
// import Achievements from "./pages/Achievements/Achievements";
// import Settings from "./pages/Settings/Settings";
// import { Error } from "./components/Error";

const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const MainMenu = lazy(() => import("./pages/MainMenu/MainMenu"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Error = lazy(() => import("./components/Error"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Statistics = lazy(() => import("./pages/Statistics/Statistics"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Achievements = lazy(() => import("./pages/Achievements/Achievements"));
const Settings = lazy(() => import("./pages/Settings/Settings"));

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
  colorSecondary: "#757575",
  boxShadow: "rgba(0, 0, 0, 0.5)",
  name: "dark",
};

const themes: Record<string, Theme> = {
  light: LightTheme,
  dark: DarkTheme,
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  const { user } = useUser();

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />

      <ModalProvider>
        <BrowserRouter>
          <Suspense fallback={<Error />}>
            <Routes>
              <Route index element={<LoginPage />} />
              <Route path="/main" element={<MainMenu />} />
              <Route
                path="/dashboard/*"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              >
                <Route index element={<Navigate replace to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="achievements" element={<Achievements />} />
                <Route
                  path="settings"
                  element={<Settings theme={theme} setTheme={setTheme} />}
                />
                <Route path="*" element={<Error />} />
              </Route>
              <Route
                path="*"
                element={user ? <Error /> : <Navigate to="/" />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
