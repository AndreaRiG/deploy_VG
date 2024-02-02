import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllGames, filterGamesByGenres, getGenres, filterByOrigin, orderByName, orderByRating } from '../../redux/actions';
import style from './Home.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado'
import SearchBar from '../SearchBar/SearchBar';



const Home = () => {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames) //se declara esta constante y me trae lo que está en el estado de videogames



    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15) // este estado local le pongo cuantos personajes quiero por página
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage

    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //con este useEffect traigo el dispatch de la action ahi le pongo estos corchetes para que no se me dispare un loop infinito de llamados
    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getGenres());
    // }, [dispatch])

    //========================

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllGames());
    }

    //========================

    const handleReloadGames = () => {
        dispatch(getAllGames());
    };





    //========================filter genres

    const handlefilterGenres = (e) => {
        dispatch(filterGamesByGenres(e.target.value))
        setCurrentPage(1)
    }

    //========================filter by origin

    const handlefilterbyOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value))
        setCurrentPage(1)
    }


    //========================filter by name
    const handleOrderByName = (e) => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
    }


    //========================filter by Raiting

    const handleOrderByRating = (e) => {
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
    }




    return (
        <>
         <div className={style.container_principal}> 
             <div className={style.container1}> 
            <br />
            <br />

            <div className={style.filtros_1}>


                <select onChange={handleOrderByName}>
                    <option value="orderByName">Alfabetic Order</option>
                    <option value="asc">Order A to Z</option>
                    <option value="des">Order Z to A</option>
                </select>
            

            
                <select onChange={e => handlefilterGenres(e)} >
                    <option disabled selected>Filter by Genres</option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>

                </select>
           


           


            

                <select onChange={handleOrderByRating}>
                    <option value=""> Raiting Order </option>
                    <option value="asc">Low to High</option>
                    <option value="des">High to Low </option>
                </select>
            

            
                <select onChange={handlefilterbyOrigin} >
                    <option value=""> Game by Origin</option>
                    <option value="all">All</option>
                    <option value="api">Api Games</option>
                    <option value="created">Created</option>
                </select>
             

             </div> 

            
                <div className={style.paginadoChild}>
                    <Paginado
                        gamesPerPage={gamesPerPage}
                        allVideogames={allVideogames.length}
                        paginado={paginado} />
                </div>
                <div>
                    <button className={style.botonprevious}>Previous Page</button>
                    <button onClic className={style.botonnext}>Next Page</button>
                    <p className={style.ActualPage}>Actual Page:{currentPage}</p>
                </div>



            </div>


            <div>
                        <button onClick={handleReloadGames} className={style.Recharge} >
                        Reload VG
                        </button>
                    </div> 


            {/* <Link to='/create' className={style.crearPosition}>
                <button className={style.crearboton}>Create VG</button>
            </Link> */}

            <div className={style.searchPosition}>


                <SearchBar />
            </div>
            <div className={style.tarjetas}>
                {
                    currentGames?.map((e) => (

                        <Card
                            key={e.id}
                            name={e.name}
                            background_image={e.background_image}
                            genres={e.genres}
                            id={e.id}
                        />
                    ))

                }
            </div>
           

       

        </div>
        </>

    )



}

export default Home;