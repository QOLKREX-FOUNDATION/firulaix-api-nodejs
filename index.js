const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const Sockets = require("./config/sockets");

require("dotenv").config();

const { dbConnection } = require("./database/config");

const httpServer = http.createServer(app);

const io = new SocketServer(httpServer, {
  origins: "*",
});

function configurarSockets() {
  new Sockets(io);
}

configurarSockets();

//DB
dbConnection();

//CORS
app.use(cors());

//Morgan
app.use(morgan("dev"));

//parse Body Json
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

//Routes
app.use("/api/auth", require("./routes/auth"));

//data Firulaix
app.use("/api/adopters", require("./routes/adopters"));
app.use("/api/pets", require("./routes/pets"));

//Registro Plataforma
app.use("/api/users", require("./routes/users"));

//Renian
app.use("/api/renian", require("./routes/renian"));

// Files

app.use("/api/files", require("./routes/files"));

// Static files
// app.use("/public/images/", express.static(__dirname + "/public/images/"));

process.env.TZ = "America/Lima";

httpServer.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
