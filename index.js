const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');

require("dotenv").config();

const { dbConnection } = require("./database/config");

//DB
dbConnection();

app.use(cors());

//parse Body Json
app.use(express.json());
app.use(fileUpload())

//Routes
app.use("/api/auth", require("./routes/auth"));

//data
app.use("/api/adopters", require("./routes/adopters"));
app.use("/api/pets", require("./routes/pets"));

//Registro Plataforma
app.use("/api/users", require("./routes/users"));
app.use("/api/renian", require("./routes/renian"));

process.env.TZ = "America/Lima";

app.listen(process.env.PORT, () => {
	console.log("Servidor corriendo" + process.env.PORT);
});
