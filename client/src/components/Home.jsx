import React from 'react';
import { Link } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from '../redux/actions';

const Home = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)

    useEffect(() => {
        dispatch(getAllDogs());
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(allDogs());
    }

    return (
        <div>
            <h1>PERROS PI</h1>
            <p>Esto es el Home</p>
            <Link to= '/dogs'>Crear Perro</Link>
            <button onClick={e => {handleClick(e)}}>
                Cargar los perros
            </button>
            <div>
                
            </div>
        </div>
    )
};

export default Home;