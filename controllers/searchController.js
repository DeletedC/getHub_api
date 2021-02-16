const searchRouter = require('express').Router();
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.post('/', async (req, res) => {
//     // OMDB
//     try {
//         const { query } = req.body;
//         console.log(`Query from front is ${query}`)
//         const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
//         console.log('Results from TRY block')
//         console.log(result.data.Search);
//         res.send(result.data.Search);
//     } catch (error) {
//         console.log(error);
//         res.send('Sorry, the request failed.');
//     }


});

searchRouter.get('/', async (req, res) => {
    // AMAZON 

    let amazonData;
    try {
        await axios.get('https://www.amazon.com')
            .then((data) => {
                const dom = new JSDOM(data);
                console.log(dom.window.document.querySelectorAll('.a-list-item'));
                res.send('Hey');
            })
    } catch (error) {
        console.log('I blew up.');
        console.log(error);
    }

})


module.exports = searchRouter;