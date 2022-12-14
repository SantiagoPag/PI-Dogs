import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getTemperaments, filterByName, filterByTemperaments, filterByWeight, filterCreatedDog, setCurrentPage } from '../../redux/actions';
import Card from '../Card/Card';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css'


export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const allTemperaments = useSelector((state) => state.allTemperaments);
    const [orden, setOrden] = useState('');

    const currentPage = useSelector(state => state.page);
    /* const [currentPage, setCurrentPage] = useState(1); */
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog)


    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    }, [dispatch])


    function handleClick(e) {
        window.location.reload(false);
    }

    const paginado = pageNumber => {
        dispatch(setCurrentPage(pageNumber))
    }

    function handlerFilterName(e) {
        dispatch(filterByName(e.target.value))
        dispatch(setCurrentPage(1))
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handlerFilterWeight(e) {
        dispatch(filterByWeight(e.target.value))
        dispatch(setCurrentPage(1))
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handlerFilterCreated(e) {
        dispatch(filterCreatedDog(e.target.value))
        dispatch(setCurrentPage(1))
    }

    function handlerFilterTemp(e) {
        e.preventDefault()
        dispatch(filterByTemperaments(e.target.value))
        dispatch(setCurrentPage(1))
    }


    return (
        <div className={style.background}>       {/* background div */}
            <header>
                <div>
                    <Link className={style.link_title} to='/'>
                        <h1>Doggie Wiki</h1>
                    </Link>
                </div>
                <Link to='/create'>
                    <button className={style.btn_create}>Create your own dog!</button>
                </Link>
                <SearchBar paginado={paginado} />
                <div className={style.filters}>
                    <div>
                        <select className={style.filter_name} onChange={e => handlerFilterName(e)}>
                            <option disabled selected defaultValue>Order by name</option>
                            <option key={1} value="A-Z">A-Z</option>
                            <option key={2} value="Z-A">Z-A</option>
                        </select>

                        <select className={style.filter_weight} onChange={e => handlerFilterWeight(e)}>
                            <option disabled selected defaultValue>Order by weight</option>
                            <option key={1} value="min_weight">Min</option>
                            <option key={2} value="max_weight">Max</option>
                        </select>

                        <select className={style.filter_created} onChange={e => handlerFilterCreated(e)}>
                            <option disabled selected defaultValue>Order by created</option>
                            <option key={1} value="all">All</option>
                            <option key={2} value="created">Created</option>
                            <option key={3} value="api">Api</option>
                        </select>

                        <select className={style.filter_temp} onChange={e => handlerFilterTemp(e)}>
                            <option disabled selected defaultValue>Temperaments</option>
                            <option key={1 + 'e'} value="All">All</option>
                            {
                                allTemperaments.map(temp => (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                ))
                            }
                        </select>
                        <button className={style.btn_reload} onClick={e => { handleClick(e) }}>Reload Dogs</button>
                    </div>
                </div>
            </header>

            <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />

            <div className={style.container_cards}>
                {Object.keys(allDogs).length ?
                    <div className={style.cards}>
                        {currentDogs?.map(e => {
                            return (
                                <div key={e.id}>
                                    {
                                        <Card
                                            key={e.id}
                                            id={e.id}
                                            name={e.name}
                                            image={e.image}
                                            temperament={e.temperament}
                                            weight_min={e.weight_min}
                                            weight_max={e.weight_max}
                                        />
                                    }
                                </div>
                            )
                        })}
                    </div> :
                    <div>
                        <h1>SEARCHING DOGGIES...</h1>
                    </div>}

            </div>
        </div>              /* background div */
    )

};