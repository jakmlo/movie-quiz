import React from "react";
import backgroundImage from "../assets/kino.webp";
import MenuContainer from "../components/MenuContainer";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu-page">
      <img className="menu-image" alt="Sala kinowa" src={backgroundImage} />
      <div className="menu-wrapper">
        <MenuContainer />
      </div>
    </div>
  );
};

export default Menu;
