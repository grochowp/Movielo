import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../index.css";
import { UserProvider } from "./contexts/UserContext.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
