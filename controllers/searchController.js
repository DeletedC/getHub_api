const searchRouter = require('express').Router();
const axios = require('axios');

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.post('/', async (req, res) => {
    // OMDB
    try {
        const { query } = req.body;
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
        console.log(result.data.Search);
        res.send(result.data.Search);
    } catch (error) {
        console.log(error);
        res.send('Sorry, the request failed.');
    }
});

searchRouter.get('/:id', async (req, res) => {
    // OMDB, get movie details using IMDB ID
    console.log(req.params.id);
    try {
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${req.params.id}`);
        console.log(result.data);
        res.send(result.data);
    } catch (error) {

    }
})



module.exports = searchRouter;