var express = require("express");
var bodyParser = require("body-parser");
var { router } = require("./routes.js");

var server = express();
var PORT = 3000;

// Para parsear el body del request
server.use(bodyParser.json());

// Para realizar el routeo para el manejo de los clientes
server.use('/api', router);

// Pongo al servidor a escuchar en el PORT
server.listen(PORT, () => console.log(`Se esta ejecutando el servidor en el puerto ${PORT}`))

module.exports = server;
