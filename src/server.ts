#!/usr/bin/env node

/**
 * Module dependencies.
 */

import "reflect-metadata";
import app from "./app";
var debug = require("debug")("socketio-server:server");
import * as http from "http";
import socketServer from "./socket";

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const io = socketServer(server);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

var numClients = {};
var clientNames = {};
var rematchCounter = 0;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
      console.log("A user disconnected");
      // if (numClients[socket.room] !== undefined) {
      //     numClients[socket.room]--;
      // }
      // console.log(numClients[socket.room]);
  })

  socket.on("joinGameLobby", (room) => {
      console.log('joinGameLobby');
      const { gameId } = room;
      socket.join(gameId);
      console.log(gameId);
      // socket.room = gameId;
      if (numClients[gameId] === undefined) {
          numClients[gameId] = 1;
      }
      else {
          numClients[gameId] += 1;
      }
      if (clientNames[gameId] === undefined) {
          clientNames[gameId] = [];
      }
      clientNames[gameId].push(room.username);
      console.log(clientNames[gameId]);
  });

  socket.on("updateWaitingGames_chess", () => {
      const arr = Array.from(io.sockets.adapter.rooms);
      const filtered = arr.filter(room => !room[1].has(room[0]))
      const pendingRooms = filtered.filter(room => room[1].size == 1)
      const res = pendingRooms.map(i => i[0]);
      socket.emit("waitingGames_chess", { rooms: res });
  });

  socket.on("shouldGameStart", (gameId) => {
      console.log('shouldGameStart');
      console.log(gameId);
      console.log(numClients[gameId]);
      if (numClients[gameId] === 2) {
          io.in(gameId).emit("start game", clientNames[gameId]);
          io.in(gameId).emit('message', { text: "Welcome to Online Chess!", user: "admin" });
      }

      if (numClients[gameId] > 2) {
          console.log("room full :(");
      }
  });

  socket.on("move", (state) => {
    console.log('move');
    
      io.in(state.gameId).emit("userMove", state);
  })

  socket.on("castle", (data) => {
      io.in(data.gameId).emit("castleBoard", data);
  })

  socket.on("rematch", (data) => {
      rematchCounter += data.num;
      if (rematchCounter === 2) {
          rematchCounter = 0;
          io.in(data.gameId).emit("initiateRematch");
      }
  })

  socket.on("clickResign", (data) => {
      io.in(data.gameId).emit("initiateResign", data);
  })

  socket.on("enPassant", (data) => {
      io.in(data.gameId).emit("handleEnpassant", data);
  })

  socket.on("sendMessage", (message, gameId, username, callback) => {
      io.in(gameId).emit('message', { text: message, user: username })
      callback();
  });

  socket.on("callUser", (data) => {
      io.in(data.gameId).emit("hello", { signal: data.signalData, from: data.from })
  });

  socket.on('acceptCall', (data) => {
      io.in(data.gameId).emit("callAccepted", data.signal);
  });
})

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);

  console.log("Server Running on Port: ", port);
}
