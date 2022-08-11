const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

const { dbConnection } = require("./database/config");

//DB
dbConnection();

app.use(cors());

//parse Body Json
app.use(express.json());


//Routes
app.use('/api/auth', require('./routes/auth'));

//data
app.use('/api/adopters', require('./routes/adopters'));
app.use('/api/pets', require('./routes/pets'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo'+ process.env.PORT);
});
    