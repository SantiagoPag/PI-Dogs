import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={style.background}>
            <div>
                <div>
                    {/* <img src='./Images/doggie2.png' alt="#" /> */}
                    <h1 className={style.title}>Doggie Wiki</h1>
                    <p className={style.description}>Here you can learn different things about dogs</p>
                </div>
                <Link to='/home'>
                    <button className={style.btn}>Enter Wiki!</button>
                </Link>
            </div>
        </div>
    )
}