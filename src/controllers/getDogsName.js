const  { Dog }  = require('../db');
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');

const getDogsName = async (req, res) => {
    let name = req.query.name

    try{
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`) 

        const dogsAPI = await data?.map((dog) => {
            return {
                id: dog.id,
                image: dog.image.url,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                temperament: dog.temperament,
                life_span: dog.life_span
            }
        })
        let dogFilteredApi;
        if (name && dogsAPI.length > 0) {
            dogFilteredApi = dogsAPI.find((dog) => dog.name.toLowerCase() === name.toLowerCase());
        }
        /* Buscando en la DB */
        const dogFilteredDB = await Dog.findOne({
            where: { 
                name:{[Sequelize.Op.iLike]: `%${name}%`}
            },
            include: [{ 
                model: Temperament, 
                attributes: ['name'] 
            }],
        })

        if (!dogFilteredApi && !dogFilteredDB) {
            return res.status(404).send(`No se encontró ninguna raza de perro con el nombre ${name}`);
        }
        return res.status(200).json(dogFilteredApi || dogFilteredDB);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
module.exports = getDogsName;

