/* Configuracion y ejecucion del router */
const { Router } = require('express');
const router = Router();
const axios = require('axios');


/* Importacion de rutas */
const dogsRoute  = require('./dogsRoute');
const temperamentsRoute = require('./temperamentsRoute');


/* Config. de router */
router.use('/dogs', dogsRoute)
router.use('/temperaments', temperamentsRoute)

module.exports = router;
