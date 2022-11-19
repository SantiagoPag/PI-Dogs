import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import style from './SearchBar.module.css'



export default function SearchBar ({paginado}) {

    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState('');
    const history = useHistory();

    const handleInput = e => {
        e.preventDefault()
        setSearchDog(e.target.value)
    };

    const handleSubmit = e => {
        e.preventDefault()
        if(searchDog)
        dispatch(getDogName(searchDog))
        setSearchDog('')
        history.push('/home')
        paginado(1)
    };

    return (
        <div className={style.container}>
            <form className={style.form}>
                <input className={style.searchbar} type="text" onChange={e => handleInput(e)} value={searchDog} placeholder='Search dog'/>
                <button className={style.btn} type="submit" onClick={e => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
};


