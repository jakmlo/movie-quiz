// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// //Socket.io
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  socket.on("disconnect", function () {
    console.log("user disconnected");
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
