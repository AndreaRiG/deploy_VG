import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';


const landingPage = () => {

    return (
        <div className={style.container}>
            <div className={style.title}> 
            Explore the
                Exciting World 
                of Video games
                
            </div>
            <div className={style.aver}>
                <Link to='/home' >
                    <button className={style.boton} >
                       Start 
                       </button>
                </Link> 
                </div>
           

        </div >
    )


};

export default landingPage