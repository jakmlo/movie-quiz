import { React, useEffect, useState } from "react";
import { socket } from "../service/socket";

const MultiplayerGame = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return (
    <div>
      MultiplayerGame
      <p>State: {"" + isConnected}</p>
      <>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </>
    </div>
  );
};

export default MultiplayerGame;
