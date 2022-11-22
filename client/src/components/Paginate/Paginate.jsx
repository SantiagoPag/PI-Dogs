import React from "react";
import style from './Paginate.module.css'
import { useSelector } from "react-redux";


export default function Paginate({ dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    const currentPage = useSelector(state => state.page)

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {       //cantidad de elementos totales, dividido limito de elementos por página
        pageNumbers.push(i)
    }

    return (
        <nav className={style.nav}>
            <ul>
                <button onClick={() => paginado(currentPage > 1 ? currentPage - 1 : 1)} className={style.btn}>
                    Prev
                </button>
                {pageNumbers?.map(number => {
                    return (
                        <li className={style.list}>
                            <button key={number} className={currentPage === number ? style.active : style.btn} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    )
                })}
                <button onClick={() => paginado(currentPage < pageNumbers.length - 1 ? currentPage + 1 : pageNumbers.length)} className={style.btn}>
                    Next
                </button>
            </ul>
        </nav>
    )
};