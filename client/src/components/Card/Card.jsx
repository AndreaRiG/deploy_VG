import React from 'react';
import CardIns from '../CardIns/CardIns';
import style from './Card.module.css'

const Card =({ background_image, name, genres, id })=>{

    return (
        <div className={style.cardsTodas}>
           <CardIns  background_image={background_image} name= {name} genres={genres} id={id}/>
        </div>
    );

}

export default Card;