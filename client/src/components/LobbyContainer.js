import { React, useState, useEffect } from "react";
import { socket } from "../service/socket";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../assets/back-icon.png";
import CircularProgress from "./CircularProgress";

import "./LobbyContainer.scss";

const LobbyContainer = () => {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const { state } = useLocation();
  const level = state?.level;
  const startValue = state?.startValue;

  useEffect(() => {
    console.log("Level", level);
    socket.connect();
    // Dołącz do lobby po zamontowaniu komponentu
    socket.emit("joinLobby", level);

    // Zaktualizuj liczbę graczy w lobby
    socket.on("lobbyUpdate", (count) => {
      setPlayerCount(count);
    });

    // Poczekaj na grę
    socket.on("waitForGame", () => {
      setWaiting(true);
      console.log("Czekam na grę");
    });

    // Rozpocznij grę
    socket.on("gameStart", () => {
      setWaiting(false);
      navigate("/multiplayer", {
        state: { level: level, startValue: startValue },
      });
    });

    // Ostrzeżenie, że nie ma wystarczającej liczby graczy
    socket.on("notEnoughPlayers", () => {
      setWaiting(false);
      console.log("Nie ma wystarczającej liczby graczy.");
      // Tutaj możesz wyświetlić odpowiednie powiadomienie dla użytkownika
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleBackClick = () => {
    navigate("/");
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
      <div className="lobby-container">
        <h2 className="lobby-container__title">Movie Quiz</h2>
        <p className="lobby-container__header">Lobby</p>
        <p className="lobby-container__header">Liczba graczy: {playerCount}</p>
        {waiting && (
          <CircularProgress
            size={50}
            strokeWidth={5}
            percentage={percentage}
            color={"black"}
            setPercentage={setPercentage}
          />
        )}
      </div>
    </>
  );
};

export default LobbyContainer;
