import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDog, clearDetail } from "../../redux/actions";
import style from './Detail.module.css';


export default function Detail(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDog(id))
        return () => {
            dispatch(clearDetail());
        };
    }, [dispatch, id]
    )

    const myDog = useSelector((state) => state.dogDetail)
    console.log(myDog)
    return (
        <div className={style.background}>
            <Link to="/home">
                <button>
                    Home
                </button>
            </Link>
            {
                myDog.name ?
                    <div className={style.card}>
                        <h1 className={style.name}>{myDog.name}</h1>
                        <img className={style.image} src={myDog.img ? myDog.img : myDog.image} alt='#' width='400' height='400' />
                        <div className={style.detail}>
                            <h4>Temperaments: {myDog.temperament}</h4>
                            <h4>Min weight: {myDog.weight_min} lbs</h4>
                            <h4>Max weight: {myDog.weight_max} lbs</h4>
                            <h4>Min height: {myDog.height_min} cm</h4>
                            <h4>Max height: {myDog.height_max} cm</h4>
                            <h4>Life span: {myDog.life_span}</h4>
                        </div>
                    </div> :
                    <p>Loading...</p>
            }
        </div>
    )
};