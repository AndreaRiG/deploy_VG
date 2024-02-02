import React from 'react';
import style from './Paginado.module.css'


const Paginado = ({ gamesPerPage, allVideogames, paginado }) => {

    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allVideogames / gamesPerPage - 1); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <div className={style.paginado}>
        <nav >
        
            <div className={style.paginadoChild}>
                {pageNumbers &&
                    pageNumbers.map(num => {
                        return <button className={style.bottNav}
                            key={num} onClick={() => paginado(num)}>
                            {num} </button>
                    })}

            </div>
        </nav>
        </div>
    )
};

export default Paginado;