import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/home">
        Home
      </a>

      <a className="menu-item" href="/roster">
        Roster
      </a>


      <a className="menu-item" href="/settings">
        Settings
      </a>

      <a className="menu-item" href="/logout">
        Logout
      </a>

      <a className="menu-item" href="/about">
        About Us
      </a>


    </Menu>
  );
};