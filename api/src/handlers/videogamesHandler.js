const { getVg , getVgById, 
   createVg
} = require('../controllers/videogamesController')

//traer todos los juegos o traerlos por sus nombres
const getVideogames = async (req, res) => {
    const { name } = req.query
    try {
        const games = await getVg(name);
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// // traer juegos por id
const getVideogameById = async (req, res) => {
    const { id } = req.params;
    let source = isNaN(id) ? 'db' : 'api';
    try {
        const gamesById = await getVgById(id, source);
        res.status(200).json(gamesById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// crear juego
const postVideogame = async (req, res) => {
    const { name, description, platform, background_image, released, rating, genres } = req.body;
    try {
      const newGame = await createVg({ name, description, platform, background_image, released, rating, genres });
      res.status(200).json(newGame);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



module.exports = {
    getVideogames,
    getVideogameById,
    postVideogame,
}