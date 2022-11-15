import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getTemperaments, filterByName, filterByTemperaments, filterByWeight, filterCreatedDog } from '../redux/actions';
import Card from './Card';
import Paginate from './Paginate';
import Navbar from './Navbar';


const Home = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector((state) => { return state.temperaments });
    const [orden, setOrden] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog)


    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    }, [dispatch])

    function handleFilterName(e) {
        dispatch(filterByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleClick(e) {
        window.location.reload(false);
    }

    const paginado = pageNumber => {
        setCurrentPage(pageNumber)
    }


    return (
        <div>       {/* background div */}
            <div>
                <Link to='/'>
                    <h1>PERROS PI</h1>
                </Link>
            </div>
            <div>
                <Link to='/create'>
                    <button>Create dog</button>
                </Link>
                <button onClick={e => { handleClick(e) }}>Reload Dogs</button>
            </div>
            <div>
                <Navbar paginado={paginado}/>
                <div>
                <select onChange={e => handleFilterName(e)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                </div>
                <div>
                    {
                        allDogs?.map(e => {
                            return (
                                <Card name={e.name} image={e.image} temperament={e.temperament} weight_min={e.weight_min} weight_max={e.weight_max} key={e.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;