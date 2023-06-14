// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const fetchData = require("./utilities/fetchData");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// //Socket.io

// Przechowuje informacje o graczach i lobby
const lobbies = [
  { level: "Początkujący", users: [] },
  { level: "Średniozaawansowany", users: [] },
  { level: "Zaawansowany", users: [] },
];

const answers = {};

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  // Dodaj nowego gracza do lobby
  // Dołącz do pokoju na podstawie wybranego poziomu trudności
  socket.on("joinLobby", (selectedLevel) => {
    const room = lobbies.find((lobby) => lobby.level === selectedLevel);
    const user = { id: socket.id, points: 1 };
    if (room) {
      // Pokój dla wybranego poziomu już istnieje, dołącz do niego
      console.log("Dołączam do pokoju ", selectedLevel);
      socket.join(room.level);
      room.users.push(user);
      console.log("Lobby", room.users.length);
    } else {
      // Pokój dla wybranego poziomu nie istnieje, utwórz nowy pokój
      const newRoom = { level: selectedLevel, users: [user] };
      lobbies.push(newRoom);
      socket.join(newRoom.level);
    }
    console.log(room);
    // Powiadom wszystkich graczy w pokoju o aktualnej liczbie graczy
    io.to(room.level).emit("lobbyUpdate", room.users.length);

    // Sprawdź, czy osiągnięto minimalną liczbę graczy
    if (room.users.length >= 2) {
      io.emit("waitForGame");
      // Poczekaj 10 sekund na kolejnych graczy
      setTimeout(() => {
        // Sprawdź ponownie, czy osiągnięto minimalną liczbę graczy
        if (room.users.length >= 2) {
          io.emit("gameStart");
          console.log("Wystarczająca liczba graczy");
        } else {
          io.emit("notEnoughPlayers");
        }
      }, 5000);
    } else {
      io.emit("notEnoughPlayers");
    }
  });

  socket.on("joinGame", async (selectedLevel) => {
    const room = lobbies.find((lobby) => lobby.level === selectedLevel);
    const user = { id: socket.id, points: 0 };
    console.log("Dołączam do gry");
    if (room) {
      // Pokój dla wybranego poziomu już istnieje, dołącz do niego
      console.log("Dołączam graczy do pokoju");
      console.log(room);
      socket.join(room.level);
      room.users.push(user);
      io.to(room.level).emit("countdown");
      const selectedQuestions = await fetchData(selectedLevel);
      io.to(room.level).emit("questions", selectedQuestions);
    } else {
      // Pokój dla wybranego poziomu nie istnieje, utwórz nowy pokój
      const newRoom = { level: selectedLevel, users: [user] };
      lobbies.push(newRoom);
      socket.join(newRoom.level);
      console.log("Stworzono pokój");
    }
    console.log(room);
    // Powiadom wszystkich graczy w pokoju o aktualnej liczbie graczy
    io.to(room.level).emit("lobbyUpdate", room.users.length);
    setTimeout(() => {
      if (room.users.length < 2) {
        io.to(room.level).emit("exitGame");
      }
    }, 3000);
  });

  socket.on("startedGame", async (selectedLevel) => {});

  socket.on("answer", (selectedLevel, score, socketID) => {
    answers[socketID] = true;
    const room = lobbies.find((lobby) => lobby.level === selectedLevel);
    const user = room.users.find((user) => {
      return user.id === socketID;
    });
    if (user) {
      user.points = score;
    }
    console.log("Odpowiedzi:", answers);

    const totalUsers = io.sockets.adapter.rooms.get(room.level).size;
    const answeredUsers = Object.keys(answers).length;

    console.log("Wszyscy gracze:", totalUsers);

    console.log("Odpowiedziało:", answeredUsers);

    if (answeredUsers === totalUsers) {
      io.to(room.level).emit("nextQuestion");
      Object.keys(answers).forEach((key) => {
        delete answers[key];
      });
    }
    console.log(user);
  });

  // Usuń gracza z lobby przy rozłączeniu
  socket.on("disconnect", () => {
    // Przeszukaj wszystkie pokoje i usuń identyfikator użytkownika
    lobbies.forEach((lobby) => {
      const userIndex = lobby.users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        lobby.users.splice(userIndex, 1);
        io.to(lobby.level).emit("lobbyUpdate", lobby.users.length);
      }
    });
  });
});

server.listen(5000, () => {
  console.log("Listening");
});

//Database connection

// const mongo = require("./utilities/database");
// mongo.connect();

// Express route handlers
// app.use("/questions", require("./routes/questionsRoutes"));
