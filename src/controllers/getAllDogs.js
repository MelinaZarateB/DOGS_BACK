const { Dog, Temperament } = require('../db');
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

const getDogsAPI = async () => {
   // const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_IZ6MS7Sbms9Zo0S2jnidv8oZmDKVtBrnVnmYfqQ9u7KyhylBRdpn9DzGwF3sSDGw') 
    const response = await fetch('https://api.thedogapi.com/v1/breeds?api_key=live_h6gLcZfI9cZ62ALK7SxRX1dmlljpmrJ7aYN52rA7fPz2FFhxsP5L1pAajBIAEffE')
    .then((response) => response.json())


    const dogsAPI = await response?.map((dog) => {
        return {
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric, // "18 - 29"
            temperament: dog.temperament,
            life_span: dog.life_span
        }
    })
    return dogsAPI
};

const getDogsDB = async () => {

        let allDogsDb = await Dog.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through:{
                    attributes: [],
                }
            }
        })
        
        const dogsDB = allDogsDb?.map((dog) => {
            return{
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: `${dog.min_height} - ${dog.max_height}`,
                weight: `${dog.min_weight} - ${dog.max_weight}`,
                life_span: dog.life_span,
                temperament: dog.temperaments.map((temperament) => temperament.name).join(', '),
                createInDb: dog.createInDb
            }
        })
        return dogsDB;
}

const allDogs = async (req, res) => {
    try{
        const dogsAPI = await getDogsAPI()
        const dogsDB = await getDogsDB()
        if(!dogsAPI || !dogsDB) throw new Error('Error loading data');
        const allDogs = dogsAPI.concat(dogsDB);

        if(allDogs) {
            res.status(200).json(allDogs)
        }
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}
module.exports = {
    allDogs,
    getDogsDB
}

