const { Videogame, Genres } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;

//--------Traer todos los juegos------
const getAllVg = async () => {
    // Traer los juegos de la base de datos (incluyendo su relación)
    const gamesDb = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    const arrayGamesDB = gamesDb.map((game) => {
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platform: game.platform,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            genres: game.genres.map((genres) => genres.name),
        };
    });

    const getAllGamesFromApi = async (page = 1, games = []) => {
        const response = await axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
        );

        const gamesApi = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                platform: game.platforms.map((e) => e.platform.name),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map((g) => g.name),
            };
        });

        const totalGames = games.concat(gamesApi);

        if (totalGames.length < 100 && response.data.next) {
            const nextPage = page + 1;
            return getAllGamesFromApi(nextPage, totalGames);
        }

        return totalGames.slice(0, 100); // Limitar a 100 juegos
    };

    const arrayGamesApi = await getAllGamesFromApi();

    return [...arrayGamesDB, ...arrayGamesApi];
};

const getVg = (name) => {
    if (!name) return getAllVg()   //Todos los juegos 
    else return getVgByName(name)  //Juegos por nombre       
};

//---------Traer los juegos por name---------------

const getVgByName = async (name) => {
    try {
        // Busco en la base de datos por nombre
        const gamesDb = await Videogame.findAll({
            where: { name: name },
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        const arrayGamesDb = gamesDb.map(game => {
            return {
                id: game.id,
                name: game.name,
                description: game.description,
                platform: game.platform,
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map(genres => genres.name)
            };
        });


        const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const gamesApi = response.data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                platform: game.platforms.map(e => e.platform.name),
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres.map(g => g.name)
            };
        });

        let allGamesByName = [...arrayGamesDb, ...gamesApi].slice(0, 15);  // -----> Combinación de juegos de la DB y la API
        return allGamesByName;
    } catch (error) {
        throw new Error('El juego ingresado no existe');
    }
};



//---------Traer los juegos por su id-------------

// De la API
// Traer los juegos por su ID
const getVgById = async (id, source) => {
    try {
      if (source === 'api') {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const game = response.data;
        return {
          id: game.id,
          name: game.name,
          description: game.description,
          platform: game.platforms.map(e => e.platform.name),
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
          created: false,
        };
      } else {
        const game = await Videogame.findByPk(id, {
          include: {
            model: Genres,
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
        });
  
        if (!game) {
          throw new Error(`No se encontró ningún videojuego con ID ${id}`);
        }
  
        return {
          id: game.id,
          name: game.name,
          description: game.description,
          platform: game.platform,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((genres) => genres.name),
          created: true,
        };
      }
    } catch (error) {
      throw new Error('Error al obtener el videojuego por ID');
    }
  };
  


    //-------------Crear un nuevo juego---------------
    // const createVg = async ({ name, description, platform, background_image, released, rating, genres }) => {
    //     const newVideoGame = await Videogame.create({ name, description, platform, background_image, released, rating, genres });

    //     return newVideoGame;
    // };

    const createVg = async ({ name, description, platform, background_image, released, rating, genres }) => {
        const newVideoGame = await Videogame.create({ name, description, platform, background_image, released, rating });
    
        const savedGenres = await Genres.findAll({ where: { name: genres } });
      
        await newVideoGame.setGenres(savedGenres);
      
        return newVideoGame;
      };
      




    module.exports = {

        getVg,
        getVgById,
        createVg,
    }
