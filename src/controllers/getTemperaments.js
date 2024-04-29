const { Temperament } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const getTemperaments = async (req, res) => {
    try{
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)

        let temperaments = [];
        data?.map((dog) => {
            if(dog.temperament){
                temperaments.push(...dog.temperament.split(',')) // let temperaments = ['Agresive, Fast, Vigilant']
            }
        })
        for(const temperamentName of temperaments) {
            await Temperament.findOrCreate({
                where: {
                    name: temperamentName.trim()
                }
            })
        }
        const allTemperaments = await Temperament.findAll()
        return res.status(200).json(allTemperaments)
    }catch(err){
        return res.status(500).json({error:err})
    }
};

module.exports = getTemperaments;


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx