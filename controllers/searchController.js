const searchRouter = require('express').Router();

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.get('/', async (req, res) => {
    // OMDB
    try {
        const { query } = req.body;
        const result = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.send('Sorry, the request failed.');
    }
});



module.exports = searchRouter;