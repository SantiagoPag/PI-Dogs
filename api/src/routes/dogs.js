const { Router } = require('express');
const { getAllDogs } = require('../controllers/Controllers');
const { Dog } = require('../db');
const router = Router();



router.get('/', async (req, res) => {
    const { name } = req.query;
    const allDogs = await getAllDogs();

    try {
        if (name) {
            const dogInput = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            if (dogInput.length) {
                return res.status(200).send(dogInput)
            } else {
                return res.status(404).send({ error: 'No doggie here' })
            }
        } else {
            return res.status(201).json(allDogs)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const allDogs = await getAllDogs();

    try {
        if (!id) {
            res.status(404).json('No doggie here')
        } else {
            const dogId = allDogs.find(dog => dog.id.toString() === id)
            return res.status(200).json(dogId)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
    /* try {
        const dogId = allDogs.filter(dog => dog.id === id)
        if(dogId.length) {
            return res.status(200).send(dogId)
        } else {
            return res.status(404).send({error: 'No doggie here'})
        }
    } catch (error) {
        return res.status(404).send(error.message)
    } */
});


router.post('/', async (req, res) => {
    const {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        createdInDb,
        temperament,
        image
    } = req.body;

    /* const dogCheck = await Dog.findAll({
        where: { name: name }
    });

    if (dogCheck.length) {
        return res.status(404).send('The dog already exist')
    }  */
    if (name && height_min && height_max && weight_min && weight_max && life_span && temperament && image) {
        let createDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            createdInDb: createdInDb,
            image: image || 'https://pbs.twimg.com/media/D6mH_epWwAAl8Yn.jpg'
        });

        let dogDb = await Dog.findAll({where: {name:name}})

        if(!dogDb.length) {
            createDog()

            let temperamentDb = await Temperament.findAll({
                where: {name: temperament}
            })         

            await createDog.addTemperament(temperamentDb)
        }

        res.status(200).send(createDog);
        
    } else {
        res.status(404).send('Data missing')
    };
});

module.exports = router;
