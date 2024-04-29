/* Configuracion y ejecucion del router */
const { Router } = require('express');
const routerTemperaments = Router();

/* Importacion de controllers */
const getTemperaments = require('../controllers/getTemperaments');


routerTemperaments.get('/', getTemperaments)

module.exports = routerTemperaments;