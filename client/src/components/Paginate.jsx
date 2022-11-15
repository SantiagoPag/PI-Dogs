import React from "react";


export default function Paginate({ dogsPerPage, allDogs, paginado }) {
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
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
};