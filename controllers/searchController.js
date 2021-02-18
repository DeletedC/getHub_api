const searchRouter = require('express').Router();
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.post('/', async (req, res) => {
    // OMDB
    try {
        const { query } = req.body;
        console.log(`Query from front is ${query}`)
        const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
        console.log('Results from TRY block')
        console.log(result.data.Search);
        res.send(result.data.Search);
    } catch (error) {
        console.log(error);
        res.send('Sorry, the request failed.');
    }


});

// searchRouter.get('/', async (req, res) => {
//     // AMAZON 

//     let amazonData = [];
//     try {
//         await axios.get('https://www.curtisjwoods.com')
//             .then((data) => {
//                 // console.log(data.data);
//                 const dom = new JSDOM(data.data);
//                 // console.log(dom);
//                 // console.log(dom.window.document.querySelectorAll('.card-imae'));
//                 dom.window.document.querySelectorAll('.card-image > img').forEach(item => {
//                     console.log(item.getAttribute('src'));
//                     amazonData.push(item.getAttribute('src'));
//                     console.log(amazonData);
//                 })
//                 // console.log(dom.window.document);
//                 res.send(amazonData);
//             })
//     } catch (error) {
//         console.log('I blew up.');
//         console.log(error);
//         res.send('I blew up.');
//     }

// })


module.exports = searchRouter;