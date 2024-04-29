const { Dog } = require('../db');
const { Temperament } = require('../db');

const postDogs = async (req, res) => {
    const { image, name, min_height, max_height, min_weight, max_weight, life_span, temperament } = req.body;
 try{
          if( !name || !min_height || !max_height || !min_weight || !max_weight || !life_span ) {
              return res.status(404).send('Faltan enviar datos obligatorios');
          }
    const dogsDB = await Dog.findAll()
    const dogExistInD = dogsDB.find((dog) => dog.name.toLowerCase() === name.toLowerCase());
    if(dogExistInD){
        return res.status(404).send(`El perro con el nombre ${name} ya existe`)
    }
      else if(temperament.length === 0){
        return res.status(404).send('Tiene que poseer al menos un temperamento')
     }
    /* Si pasa las verificaciones, crea el dog directamente: */
     const newDog = await Dog.create({
        image,
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span
    })
    /* Obteniendo ids de temperamentos para asociar con el dog creado: */
    let idTemperaments = [];
    // const temperamentsEnArray = temperaments.split(',') /* El split convierte la cadena a un array de cadenas */
    for(const temperamentName of temperament) {
        const [ temperamentCreatedOrFind ] = await Temperament.findOrCreate({
            where: {
                name: temperamentName.trim()
            }
        })
        idTemperaments.push(temperamentCreatedOrFind.id)
    }
     await newDog.addTemperaments(idTemperaments)
     return res.status(201).json({success: `Se creo con exito la raza con nombre ${newDog.name}`})
 } catch(err){
    return res.status(500).json({err: `Error al crear la raza con nombre ${name}`})
 }
};
module.exports = postDogs;

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
