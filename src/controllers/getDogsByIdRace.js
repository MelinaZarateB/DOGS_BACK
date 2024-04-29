const { Dog } = require('../db');
const { Temperament } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const {getDogsDB} = require('./getAllDogs')

const getDogsByIdRace = async (req, res) => {
    const id  = Number(req.params.id);
    try{
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`) 
        if(data){
            const findDogApi = await data.find((dog) => dog.id === id)
            return res.status(200).json(findDogApi)
        }
        else{
    /* Buscando dog en la DB */
        const dogFilteredDB = await getDogsDB()
        const findDog = await dogFilteredDB.find((dog) => dog.id === id);
        return res.status(200).json(findDog)
        }
    }catch(err){
        res.status(500).json({error: err})
    }
}
module.exports = getDogsByIdRace;

//kasdjksjdhnkjdnkjjds