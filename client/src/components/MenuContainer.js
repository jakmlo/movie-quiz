import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/firebase";
import { useAuth } from "../hooks/useAuth";
import {
  deleteUser,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Leaderboard from "./Leaderboard";

import personIcon from "../assets/person-icon.png";
import hamburgerIcon from "../assets/menu-icon.png";
import logoutIcon from "../assets/logout-icon.jpg";
import backIcon from "../assets/back-icon.png";
import forwardIcon from "../assets/forward-icon.png";
import leaderboardIcon from "../assets/leaderboard-icon.png";
import circleIcon from "../assets/circle-icon.png";
import sponsorLogo from "../assets/sponsor-logo.png";
import tmdbLogo from "../assets/tmdb-logo.png";

import "./MenuContainer.scss";

const MenuContainer = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const { user, globalUsername } = useAuth();
  const [chooseLevel, IsChooseLevel] = useState(false);
  const [chooseMultiplayerLevel, IsChooseMultiplayerLevel] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [userSettings, setUserSettings] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);
  const [about, setAbout] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [level, setLevel] = useState("Początkujący");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleChooseLevel = () => {
    IsChooseLevel(true);
  };

  const handleEasy = () => {
    navigate("/game", { state: { level: "Początkujący", startValue: 10 } });
  };
  const handleMedium = () => {
    navigate("/game", {
      state: { level: "Średniozaawansowany", startValue: 15 },
    });
  };
  const handleHard = () => {
    navigate("/game", { state: { level: "Zaawansowany", startValue: 20 } });
  };

  const handleMultiplayerEasy = () => {
    navigate("/lobby", {
      state: { level: "Początkujący", startValue: 10 },
    });
  };

  const handleMultiplayerMedium = () => {
    navigate("/lobby", {
      state: { level: "Średniozaawansowany", startValue: 15 },
    });
  };

  const handleMultiplayerHard = () => {
    navigate("/lobby", { state: { level: "Zaawansowany", startValue: 20 } });
  };

  const handleUserSettingsClick = () => {
    setUserSettings(true);
    setIsShown(false);
    IsChooseLevel(false);
    setAbout(false);
    setLeaderboard(false);
  };

  const handleLeaderboardClick = () => {
    setUserSettings(false);
    setIsShown(false);
    IsChooseLevel(false);
    setAbout(false);
    setLeaderboard(true);
  };

  const handleAboutClick = () => {
    setUserSettings(false);
    setIsShown(false);
    IsChooseLevel(false);
    setLeaderboard(false);
    setAbout(true);
  };

  const handleDeleteAccount = async () => {
    if (deleteClicked) {
      try {
        await deleteUser(user);
      } catch (error) {
        await reauthenticateWithPopup(user, googleProvider);
        await deleteUser(user);
      }
    } else {
      setDeleteClicked(true);
      setTimeout(() => {
        setDeleteClicked(false);
      }, 3000);
    }
  };

  const handleBackClick = () => {
    setUserSettings(false);
    IsChooseLevel(false);
    setLeaderboard(false);
    IsChooseMultiplayerLevel(false);
    setAbout(false);
  };

  const handleEasyLevel = () => {
    setLevel("Początkujący");
  };

  const handleMediumLevel = () => {
    setLevel("Średniozaawansowany");
  };

  const handleHardLevel = () => {
    setLevel("Zaawansowany");
  };

  const handleMultiplayer = () => {
    IsChooseMultiplayerLevel(true);
  };

  return (
    <>
      <span onClick={handleBackClick}>
        <img
          src={backIcon}
          alt="back icon"
          className="menu-container__back-icon"
        />
      </span>
      <button
        className="side-menu__btn"
        onClick={() => {
          setIsShown(!isShown);
        }}
      >
        <img
          className="side-menu__icon"
          src={hamburgerIcon}
          alt="Ikona osoby"
        />
      </button>
      {isShown && (
        <>
          <div
            className="side-menu__blocker"
            onClick={() => {
              setIsShown(false);
            }}
          ></div>
          <ul className="side-menu">
            <div className="side-menu__option-container">
              <img
                src={personIcon}
                className="side-menu__option-icon"
                alt="ikona osoby"
              />
              <span
                onClick={handleUserSettingsClick}
                className="side-menu__option"
              >
                Konto
              </span>
            </div>
            <div className="side-menu__option-container">
              <img
                src={leaderboardIcon}
                className="side-menu__option-icon"
                alt="ikona rankingu"
              />
              <span
                onClick={handleLeaderboardClick}
                className="side-menu__option"
              >
                Ranking
              </span>
            </div>
            <div className="side-menu__option-container">
              <img
                src={logoutIcon}
                className="side-menu__option-icon"
                alt="ikona wylogowania"
              />
              <span onClick={handleSignOut} className="side-menu__option">
                Wyloguj
              </span>
            </div>
          </ul>
        </>
      )}
      {userSettings && (
        <div className="menu-container">
          <h2 className="menu-container__title">Movie Quiz</h2>
          <p className="menu-container__header">Panel użytkownika</p>
          <div className="menu-container__info">
            <p className="menu-container__text">
              Nick: {user?.displayName || globalUsername}
            </p>
            <p className="menu-container__text">E-mail: {user.email}</p>
            <p className="menu-container__header">Ustawienia</p>
            <button
              className="menu-container__button"
              onClick={handleDeleteAccount}
            >
              {deleteClicked ? "Na pewno?" : "Usuń konto"}
            </button>
          </div>
        </div>
      )}

      {about && (
        <div className="menu-container--about">
          <h2 className="menu-container__title">Movie Quiz</h2>
          <p className="menu-container__header">O aplikacji</p>
          <p className="menu-container__version">Wersja 0.1.0</p>
          <p className="menu-container__header">Sponsorzy</p>
          <img
            className="menu-container__logo"
            alt="Logo Sponsora"
            src={sponsorLogo}
          />
          <p className="menu-container__header">Autorzy</p>
          <p className="menu-container__version">Marcin Borowski</p>
          <p className="menu-container__version">Jakub Młot</p>
          <p className="menu-container__version">Anna Rzucidło</p>
          <p className="menu-container__header">Dostawca API</p>
          <img
            className="menu-container__tmdb-logo"
            alt="Logo TMDB"
            src={tmdbLogo}
          />
        </div>
      )}

      {leaderboard && (
        <div className="menu-container--leaderboard">
          <h2 className="menu-container__title">Movie Quiz</h2>
          <p className="menu-container__header">{level}</p>
          <div className="menu-container__level-icon-container">
            <span onClick={handleEasyLevel}>
              <img
                src={backIcon}
                alt="back icon"
                className="menu-container__level-icon"
              />
            </span>
            <span onClick={handleMediumLevel}>
              <img
                src={circleIcon}
                alt="dot icon"
                className="menu-container__level-icon"
              />
            </span>
            <span onClick={handleHardLevel}>
              <img
                src={forwardIcon}
                alt="forward icon"
                className="menu-container__level-icon"
              />
            </span>
          </div>
          <Leaderboard level={level} />
        </div>
      )}

      {!userSettings &&
        !leaderboard &&
        !chooseLevel &&
        !chooseMultiplayerLevel &&
        !about && (
          <div className="menu-container">
            <h2 className="menu-container__title">Movie Quiz</h2>
            <button onClick={handleMultiplayer} className="menu-button">
              Gra wieloosobowa
            </button>
            <button onClick={handleChooseLevel} className="menu-button">
              Gra jednoosobowa
            </button>
            <button onClick={handleLeaderboardClick} className="menu-button">
              Ranking
            </button>
          </div>
        )}
      {chooseLevel && (
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
      {chooseMultiplayerLevel && (
        <div className="menu-container">
          <h2 className="menu-container__title">Movie Quiz</h2>
          <button onClick={handleMultiplayerEasy} className="menu-button">
            Początkujący
          </button>
          <button onClick={handleMultiplayerMedium} className="menu-button">
            Średniozaawansowany
          </button>
          <button onClick={handleMultiplayerHard} className="menu-button">
            Zaawansowany
          </button>
        </div>
      )}
      <span className="menu-container__about" onClick={handleAboutClick}>
        O aplikacji
      </span>
    </>
  );
};

export default MenuContainer;
