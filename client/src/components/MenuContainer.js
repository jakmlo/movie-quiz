import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../service/firebase";

import "./MenuContainer.css";

const MenuContainer = () => {
  const navigate = useNavigate();
  const [chooseLevel, IsChooseLevel] = useState(false);
  const handleSignOut = async () => {
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
    navigate("/game", { state: { level: "Początkujący" } });
  };
  const handleMedium = () => {
    // navigate("/game", { state: { level: "medium" } });
  };
  const handleHard = () => {
    // navigate("/game", { state: { level: "hard" } });
  };
  return (
    <>
      <button className="logout-btn" onClick={handleSignOut}>
        Wyloguj się
      </button>
      {!chooseLevel ? (
        <div className="menu-container">
          <h2 className="menu-container__title">Movie Quiz</h2>
          <button onClick={handleChooseLevel} className="menu-button">
            Wybierz poziom trudności
          </button>
          <button onClick={showRanking} className="menu-button">
            Ranking
          </button>
        </div>
      ) : (
        <div className="menu-container">
          <h2 className="menu-container__title">Movie Quiz</h2>
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
    </>
  );
};

export default MenuContainer;
