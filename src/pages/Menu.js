import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";

import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };
  const playGame = () => {
    navigate("/game");
  };
  return (
    <div>
      <div className="auth-container">
        <button className="logout-btn" onClick={handleClick}>
          Wyloguj się
        </button>
      </div>
      <div className="menu-container">
        <button onClick={playGame} className="game-button">
          Zagraj
        </button>
      </div>
    </div>
  );
};

export default Menu;
