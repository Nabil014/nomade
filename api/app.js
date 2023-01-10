const express = require("express");
const routes = require("./src/routes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const socketio = require("socket.io");
const http = require("http");

require("./db.js");

app.options("*", cors());
app.name = "API"

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors());
app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//crea el server
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};



io.on("connection", (socket) => {
  //cuando se conecta un usuario
  console.log("a user connected.");

  //despues de cada conexion toma el userId y el socketId del usuario desde el front
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      if(users){
        io.emit("getUsers", users);
      }
      console.log("soy users", users);
    });
    console.log("socket", socket.id);


 //enviar y recibir mensajes(viene del front y de aqui se envia al otro usuario)
 socket.on("sendMessage", ({ senderId, receiverId, text }) => { 
 //busca el receiver
 const user = getUser(receiverId);

      io.to(user.socketId).emit("getMessage", { 
        //este es mi sender
        senderId,
        text
       }); 
       console.log("user.socketId", user.socketId)
  })

  ///cuando alguien se desconecta
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


module.exports = server;
