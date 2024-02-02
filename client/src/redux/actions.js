
import {
    GET_ALL_GAMES,
    GET_GENRES,
    GET_GAME_BY_NAME,
    FILTER_GAMES_BY_GENRES,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    GET_PLATFORMS,
    CREATE_VIDEOGAME,
    GET_DETAIL,

} from './actionstypes';
import axios from 'axios';

export const getAllGames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/videogames');
            const data = response.data;
            dispatch({
                type: GET_ALL_GAMES,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/genres')
            const data = response.data;
            dispatch({
                type: GET_GENRES,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export function getGameByname(name){
    return async (dispatch) =>{
        try{
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            const data = response.data;
            
            return dispatch ({
                type: GET_GAME_BY_NAME,
                payload: data
            });
        }catch (error){
            console.log(error);
        }
    };
}



export const getPlatforms = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/videogames');
        const platforms = response.data.map((game) => game.platform).flat(); 
        dispatch({
          type: GET_PLATFORMS,
          payload: platforms,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  

  export function createVideogame(payload) {
    return async function(dispatch) {
      try {
        const response = await axios.post("http://localhost:3001/videogames", payload);
        dispatch({ type: CREATE_VIDEOGAME, payload: response.data });
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    };
  }


  export function getDetail(id) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
          type: GET_DETAIL,
          payload: response.data
        });
      } catch (error) {
        console.log(error);
        // Agregar código para manejar el error, como mostrar un mensaje de error o ejecutar una acción adicional
      }
    }
  }






export function filterGamesByGenres(payload) {
    return {
        type: FILTER_GAMES_BY_GENRES,
        payload
    }
}

export function filterByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

export const orderByRating = (payload)=>{
    return{
        type: ORDER_BY_RATING,
        payload
    }
}