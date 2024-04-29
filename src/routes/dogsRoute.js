/* Configuracion y ejecucion del router */
const { Router } = require('express');
const routerDogs = Router();

/* Importacion de controllers */
const {allDogs} = require('../controllers/getAllDogs');
const getDogsByIdRace = require('../controllers/getDogsByIdRace');
const getDogsName = require('../controllers/getDogsName')
const postDogs = require('../controllers/postDogs')

routerDogs.get('/name', getDogsName) 
routerDogs.get('/:id', getDogsByIdRace)
 routerDogs.get('/', allDogs)
routerDogs.post('/', postDogs)

module.exports = routerDogs;