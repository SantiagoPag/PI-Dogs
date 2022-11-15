import React from "react";


export default function Paginate({ dogsPerPage, allDogs, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {       //cantidad de elementos totales, dividido limito de elementos por página
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {pageNumbers?.map(number => {
                    return (
                        <li>
                            <button onClick={() => paginate(number)}>{number}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};