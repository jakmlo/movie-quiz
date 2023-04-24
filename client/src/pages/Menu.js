import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../service/firebase";
import Game from "./Game";

import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const [chooseLevel, IsChooseLevel] = useState(false);
  const handleClick = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };
  const showRanking = () => {};

  const handleChooseLevel = () => {
    IsChooseLevel(true);
  };

  const handleEasy = () => {
    navigate("/game", { state: { level: "easy" } });
  };
  const handleMedium = () => {
    navigate("/game", { state: { level: "medium" } });
  };
  const handleHard = () => {
    navigate("/game", { state: { level: "hard" } });
  };
  return (
    <div>
      <div className="auth-container">
        <button className="logout-btn" onClick={handleClick}>
          Wyloguj się
        </button>
      </div>
      {!chooseLevel ? (
        <div className="menu-container">
          <h2 className="title">QuizApp</h2>
          <button onClick={handleChooseLevel} className="menu-button">
            Wybierz poziom trudności
          </button>
          <button onClick={showRanking} className="menu-button">
            Ranking
          </button>
        </div>
      ) : (
        <div className="menu-container">
          <h2 className="title">QuizApp</h2>
          <button onClick={handleEasy} className="menu-button">
            Początkujący
          </button>
          <button onClick={handleMedium} className="menu-button">
            Średniozaawansowany
          </button>
          <button onClick={handleHard} className="menu-button">
            Zaawansowany
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
