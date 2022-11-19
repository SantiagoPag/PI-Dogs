import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDog, clearDetail } from "../../redux/actions";


export default function Detail(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id

    useEffect(()=>{
        dispatch(getDog(id))
        return () => {
        dispatch(clearDetail());
        };
      },[dispatch,id]
      )

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
                myDog.name ?
                <div>
                    <h1>{myDog.name}</h1>
                    <img src={myDog.img ? myDog.img : myDog.image} alt='#'/>
                    <h3>Temperaments: {myDog.temperament}</h3>
                    <h4>Min weight: {myDog.weight_min} lbs</h4>
                    <h4>Max weight: {myDog.weight_max} lbs</h4>
                    <h4>Min height: {myDog.height_min} cm</h4>
                    <h4>Max height: {myDog.height_max} cm</h4>
                    <h4>Life span: {myDog.life_span}</h4>
                </div> :
                <p>Loading...</p>
            }
        </div>
    )
};