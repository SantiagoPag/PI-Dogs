import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDog } from "../../redux/actions";


export default function Detail(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDog(props.match.params.id));
    }, [dispatch])

    const myDog = useSelector((state) => state.dogDetail)
    console.log(myDog)
    return (
        <div>
             <Link to="/home">
                <button>
                    Go Home
                </button>
            </Link>
            {
                myDog.length > 0 ?
                <div>
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].img ? myDog[0].img : myDog[0].image} alt='#'/>
                    <h3>Temperaments: {myDog[0].createdInDb? myDog[0].temperament + ' ' : myDog[0].temperament.map(e => e.name + (' '))}</h3>
                    <h4>Min weight: {myDog[0].weight_min}</h4>
                    <h4>Max weight: {myDog[0].weight_max}</h4>
                    <h4>Min height: {myDog[0].height_min}</h4>
                    <h4>Max height: {myDog[0].height_max}</h4>
                    <h4>Life span: {myDog[0].life_span}</h4>
                </div> :
                <p>Loading...</p>
            }
        </div>
    )
};