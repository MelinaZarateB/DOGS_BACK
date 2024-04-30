const express = require('express')
const { conn } = require('./db')
const routes = require('./routes/index.js');
const cors = require('cors');
/* Configuracion del middleware - Comando: npm i morgan */
const morgan = require('morgan');
const server = express();

const PORT = 3001;

server.use(morgan("dev"))
/* Middleware traductor que permite leer cuando llega data por req.body(generalmente metodo POST) */
server.use(express.json())
/* Importacion y ejecucion de Cors - Comando: npm i cors */
server.use(cors())

server.use('/', routes);

/* Se realiza la sincronizacion de sequelize con la DB y luego se levanta el servidor(si se sincronizo bien) */
module.exports = server;