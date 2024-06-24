import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface AuthRouteProps {
  element: React.ReactElement;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  const { user } = useUser();

  return user ? <Navigate to="/" /> : element;
};

export default AuthRoute;

// Currently not using
