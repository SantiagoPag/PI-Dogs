import React from "react";

export default function Card({name, temperament, weight_min, weight_max, image}) {
    return (
        <div>
            <h2>{name}</h2>
            <img src={image} alt='#' width='200px' height='250px'/>
            <h3>{temperament}</h3>
            <h4>Min. weight: {weight_min}kg - Max.weight: {weight_max}kg</h4>
            <hr />
        </div>
    )
}