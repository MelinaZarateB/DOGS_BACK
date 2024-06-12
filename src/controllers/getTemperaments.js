const { Temperament } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { allDogs } = require('./getAllDogs')

const getTemperaments = async (req, res) => {
    try{
        //const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_IZ6MS7Sbms9Zo0S2jnidv8oZmDKVtBrnVnmYfqQ9u7KyhylBRdpn9DzGwF3sSDGw')
        const response = await fetch('https://api.thedogapi.com/v1/breeds?api_key=live_IZ6MS7Sbms9Zo0S2jnidv8oZmDKVtBrnVnmYfqQ9u7KyhylBRdpn9DzGwF3sSDGw')
        const data = await response.json()
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