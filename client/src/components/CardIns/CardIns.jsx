import React  from 'react';
import { Link } from 'react-router-dom';
import style from './CardIns.module.css'

const CardIns = ({ background_image, name, genres, id }) =>{
    return (
        <>
        <div className={style.contenedor}>

        <Link to={`/detail/${id}`}>
            <h4>{name}</h4>
        </Link>
            <h5>{genres}</h5>
            <img src={background_image} alt='img not found 'width="130px" height='130px' />
        </div>
        
        </>
    )
};

export default CardIns;