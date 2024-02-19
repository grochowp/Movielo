import React from "react";
import { User } from "../../types";

interface MainMenuProps {
  user: User;
}

export const MainMenu: React.FC<MainMenuProps> = ({ user }) => {
  return <div>{user.name}</div>;
};
