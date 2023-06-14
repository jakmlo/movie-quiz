import React from "react";
import backgroundImage from "../assets/kino.webp";

import "./Lobby.scss";
import LobbyContainer from "../components/LobbyContainer";

const Lobby = () => {
  return (
    <div className="lobby-page">
      <img className="lobby-image" alt="Sala kinowa" src={backgroundImage} />
      <div className="lobby-wrapper">
        <LobbyContainer />
      </div>
    </div>
  );
};

export default Lobby;
