const mysql = require("mysql");
const mysqlConexion={}
// const mysqlConexion = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     port: process.env.MYSQL_PORT,

// });

// mysqlConexion.connect(function (err) {
//     if (err) {
//         console.log(err)
//         // console.error("Error de mysqlConexion: " + err.stack);
//         // return;
//     } else {
//         console.log("Conectado con el identificador " + mysqlConexion.threadId);
//     }
// });


module.exports = {
    mysqlConexion,
};
