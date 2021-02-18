const searchRouter = require('express').Router();
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const puppeteer = require('puppeteer');

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
    let data;
    const scrapeMovies = async () => {

        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()

        await page.goto('https://www.amazon.com/gp/video/storefront/')
            .then(() => console.log('Went to Amazon Prime Storefront.'));

        // await page.waitForTimeout(3000)
        await page.waitForSelector('.hC3fkr', {visible: true})
            .then(() => console.log('Waited for selector.'))
            .then(async () => {
                data = await page.evaluate(() => {
                    const movies = document.querySelectorAll('.hC3fkr');
        
                    const urls = Array.from(movies).map(item => item.innerHTML);
        
                    return urls;
                })
                console.log(data);
            })
            .then(async () => {
                await browser.close();
            });
    }

    await scrapeMovies()
        .then(() => {
            res.send(data);
        });

})


module.exports = searchRouter;