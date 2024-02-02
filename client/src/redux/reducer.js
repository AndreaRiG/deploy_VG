
import {
   GET_ALL_GAMES,
   GET_GENRES,
   GET_GAME_BY_NAME,
   FILTER_GAMES_BY_GENRES,
   FILTER_BY_ORIGIN,
   ORDER_BY_NAME,
   ORDER_BY_RATING,
   CREATE_VIDEOGAME,
   GET_PLATFORMS,
   GET_DETAIL,
   
} from './actionstypes';

const initialState = {
   videogames: [],
   genres: [],
   allVideogamesState: [],
   platforms: [],
   detail: []
};

const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ALL_GAMES:
         return {
            ...state,
            videogames: action.payload,
            allVideogamesState: action.payload
         };

      case GET_GENRES:
         return {
            ...state,
            genres: action.payload
         };

         case GET_GAME_BY_NAME:
            return{
               ...state,
               videogames: action.payload
            }

      case FILTER_GAMES_BY_GENRES:
         const allVideogames = state.allVideogamesState
         const genresFiltered =
            action.payload === 'all'
               ? allVideogames
               : allVideogames.filter(el => el.genres?.includes(action.payload));

         return {
            ...state,
            videogames: genresFiltered,
         };



      

      case FILTER_BY_ORIGIN:
         const filteredVideogames = state.allVideogamesState;
         const originFiltered =
            action.payload === 'all'
               ? filteredVideogames
               : action.payload === 'created'
                  ? filteredVideogames.filter(el => el.createdByDb)
                  : filteredVideogames.filter(el => !el.createdByDb);
         return {
            ...state,
            videogames: originFiltered
         };

      case ORDER_BY_NAME:
         const sortedGames = [...state.videogames];
         const sortArr = action.payload === "asc"
            ? sortedGames.sort(function (a, b)  {
               if (a.name.toLowerCase() < b.name.toLowerCase()) {
                   return -1;
               }
               if (a.name.toLowerCase() > b.name.toLowerCase()) {
                   return 1;
               }
               return 0;
           })
           : sortedGames.sort(function (a, b) {
               if (a.name.toLowerCase() > b.name.toLowerCase()) {
                   return -1;
               }
               if (a.name.toLowerCase() < b.name.toLowerCase()) {
                   return 1;
               }
               return 0;
           });
       return {
           ...state,
           videogames: sortArr
       };


      

        case ORDER_BY_RATING:
         if (action.payload === "asc") {
             return {
                 ...state,
                 videogames: [...state.videogames.sort((a, b) => a.rating - b.rating)]
             }
         }
         else {
             return {
                 ...state,
                 videogames: [...state.videogames.sort((a, b) => b.rating - a.rating)]
             }
         }

          
         case GET_PLATFORMS:
            return {
              ...state,
              platforms: action.payload,
            };
          


            case CREATE_VIDEOGAME:
               return {
                 ...state,
                 
               };

               case GET_DETAIL:
                  return{
                     ...state,
                     detail: action.payload,
                  }

      default:
return state;
   }
};

export default rootReducer;
