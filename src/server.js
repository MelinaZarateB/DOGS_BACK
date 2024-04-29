
/* Creacion del server */
const express = require('express')
const server = express();
const { conn } = require('./db')
const routes = require('./routes/index.js');

const PORT = 3001;

/* Configuracion del middleware - Comando: npm i morgan */
const morgan = require('morgan');
server.use(morgan('dev'))
/* Importacion y ejecucion de Cors - Comando: npm i cors */
const cors = require('cors');
//server.use(cors())
server.use(cors({
    origin: 'https://dogs-front-bd5a.vercel.app'
  }));
/* Middleware traductor que permite leer cuando llega data por req.body(generalmente metodo POST) */
server.use(express.json())

server.use('/', routes);

/* Se realiza la sincronizacion de sequelize con la DB y luego se levanta el servidor(si se sincronizo bien) */
module.exports = server;