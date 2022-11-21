const { Router } = require('express');
const { getAllDogs } = require('../controllers/Controllers');
const { Dog, Temperament } = require('../db');
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

    const dogCheck = await Dog.findAll({
        where: { name: name }
    });

    if (dogCheck.length) {
        return res.status(404).send('The dog already exist')
    } else {
        let createdDog = await Dog.create({
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            life_span,
            createdInDb,
            image
        })

        temperament.map(async e => {
            let temperamentDb = await Temperament.findAll({
                where: { name: e }
            })
            createdDog.addTemperament(temperamentDb)
        })
        /* createdDog.addTemperament(temperamentDb) */
        return res.status(200).send(createdDog);
    }
});

module.exports = router;
