import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={style.background}>
            <div>
                <div>
                    <h1>Doggie Wiki</h1>
                    <h2>Here in Doggie Wiki you can learn different things about dogs</h2>
                </div>
                <Link to='/home'>
                    <button className={style.btn}>Enter Wiki</button>
                </Link>
            </div>
        </div>
    )
}