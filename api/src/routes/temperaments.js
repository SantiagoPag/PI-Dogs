const { Router } = require('express');
const { API_KEY } = process.env;
const { Temperament } = require('../db');
const axios = require('axios');
const router = Router();




router.get('/', async (req, res) => {
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