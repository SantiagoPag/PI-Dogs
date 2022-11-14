import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card';
import { getAllDogs, getTemperaments, filterByName, filterByTemperaments, filterByWeight, filterCreatedDog } from '../redux/actions';

const Home = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const allTemperaments = useSelector((state) => { return state.temperaments })


    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    }, [dispatch])

    function handleFilterName(e) {
        dispatch(filterByName(e.target.value))
    }


    return (
        <div>
            <h1>PERROS PI</h1>
             <Link to='/create'>Crear perro</Link>
            <div>
                <select onChange={e => handleFilterName(e)}>
                    <option value="A-Z">Ascendente</option>
                    <option value="Z-A">Descendente</option>
                </select>
                {
                    allDogs?.map(e => {
                        return (
                            <Card name={e.name} image={e.image} temperament={e.temperament} weight_min={e.weight_min} weight_max={e.weight_max} key={e.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Home;