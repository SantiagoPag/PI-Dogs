import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css'

export default function Card({ name, temperament, weight_min, weight_max, image, id }) {
    return (
        <div className={style.card}>
            <div className={style.img}>
                <Link to={`/dogs/${id}`}>
                <img src={image} alt='#' width='200px' height='250px' />
                </Link>
            </div>
            <div className={style.info}>
                <Link className={style.link} to={`/dogs/${id}`}>
                    <h2 className={style.name}>{name}</h2>
                </Link>
                <h4 className={style.temp}>{temperament}</h4>
                <h4>Min. weight: {weight_min}kg - Max.weight: {weight_max}kg</h4>
            </div>
        </div>
    )
}