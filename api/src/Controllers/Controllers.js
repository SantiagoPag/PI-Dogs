const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`


const getApi = async () => {
    const dogsURL = await axios.get(URL);
    const dogsInfo = await dogsURL.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            weight_min: parseInt(dog.weight.imperial.split('-')[0]),
            weight_max: parseInt(dog.weight.imperial.split('-')[1]),
            height_min: parseInt(dog.height.metric.split('-')[0]),
            height_max: parseInt(dog.height.metric.split('-')[1]),
            life_span: dog.life_span,
            image: dog.image.url,
        }
    })
    return dogsInfo;
}

const getDB = async () => {
    let dogMap = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })

    dogMap = dogMap.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            weight: `${dog.weight_min} - ${dog.weight_max}`,
            life_span: dog.life_span,
            image: dog.image,
            createdInDb: dog.createdInDb,
            height: `${dog.height_min} - ${dog.height_max}`,
            temperament: dog.temperament.map(e => {return e.name}).join(',')
        }
    })
    return dogMap;
}

const getAllDogs = async () => {
    let apiInfo = await getApi();
    let dbInfo = await getDB();
    let allInfo = apiInfo.concat(dbInfo);
    return allInfo
}

module.exports = { getAllDogs };