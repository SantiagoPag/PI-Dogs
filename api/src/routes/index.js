const { Router } = require('express');
const { getAllDogs } = require('../Controllers/Controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { Sequelize, Model } = require('sequelize');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
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

router.get('/dogs/:id', async (req, res) => {
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

router.get('/temperaments', async (req, res) => {
    try {
        const api = await axios.get(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
        const dogs = await api.data.map(e => e.temperament)
        let dogSplit = await dogs.join().split(',')
        let dogTrim = await dogSplit.map(e => e.trim())
        await dogTrim.forEach(async (e) => {
            if (e.length > 0) {
                await Temperament.findOrCreate({
                    where: { name: e }
                })
            }
        })
        const allTemperament = await Temperament.findAll()
        return res.status(200).json(allTemperament)
    } catch (error) {
        res.status(404).send({ error: 'No temperaments here' })
    }
});


module.exports = router;
