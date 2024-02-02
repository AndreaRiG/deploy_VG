const axios = require('axios')
const { Genres } = require('../db')
const { API_KEY } = process.env;

// ------Solicita de la API, almacena la info en la DB------
const getGenresVg = async () => {

    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = await response.data.results.map(g => g.name)

    const count = await Genres.count();  // metodo de sequelize que cuenta los elementos que le pido

    if (count === 0) {
        genres.forEach(element => {
            Genres.create({ name: element })  // Create espera un objeto!
        })
    }
    return genres
}



module.exports = {
    getGenresVg
}