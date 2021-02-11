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



module.exports = searchRouter;