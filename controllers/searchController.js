const searchRouter = require('express').Router();
const axios = require('axios');

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.post('/', async (req, res) => {
    // OMDB
    try {
        const { query } = req.body;
        const queryString = query.toString();

        await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${queryString}`)
            .then((data) => {
                const result = data;
                // if the proper data exists and the query didn't explode
                console.log(result)
                if (result.data.Response) {

                    // Check to see if the response is 'False' (meaning no results)
                    // 'False' and 'True' in this data are strings, not boolean
                    if (result.data.Response == 'False') {
                        res.send('no-results');
                    } else {
                        console.log(result.data.Search);
                        console.log(`queryString is ${queryString}`);
            
                        res.send(result.data.Search);
                    }
                }
            })
            // If the request exploded or is invalid, send back 'no-results'
            .catch((error) => {
                console.log(`queryString is ${queryString}`);
                console.log(`Error: ${error.response.status} ${error.response.statusText}`);

                res.send('no-results');
            });
   
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