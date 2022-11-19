import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css'

export default function Card({ name, temperament, weight_min, weight_max, image, id }) {
    return (
        <div className={style.card}>
            <div className={style.img}>
                <img src={image} alt='#' width='200px' height='250px' />
            </div>
            <div className={style.info}>
                <Link to={`/dogs/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <h3>{temperament}</h3>
                <h4>Min. weight: {weight_min}kg - Max.weight: {weight_max}kg</h4>
            </div>
        </div>
    )
}