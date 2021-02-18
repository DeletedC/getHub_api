const searchRouter = require('express').Router();
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const puppeteer = require('puppeteer');

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

searchRouter.post('/', async (req, res) => {

    const { query } = req.body;
    const finalResult = {};

    console.log(`Post request received. Searching for \n"${query}"`);
//     // OMDB
//     try {
//         console.log(`Query from front is ${query}`)
//         const result = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`);
//         console.log('Results from TRY block')
//         console.log(result.data.Search);
//         res.send(result.data.Search);
//     } catch (error) {
//         console.log(error);
//         res.send('Sorry, the request failed.');
//     }

// AMAZON PRIME SEARCH
const amazonSearch = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com/s?k=sonic&i=instant-video')
        .then(() => console.log(`Initiated Amazon Prime search for ${query}`));

    await page.waitForSelector('.s-result-item', {visible: true, timeout: 3000})
        .then(() => console.log('Waited for 3 seconds.'))
        .then(async () => {
            const data = await page.evaluate(() => {
                const results = document.querySelectorAll('.s-result-item');
                console.log('Results:');
                console.log(results);

                // Using this to find the data I need
                const temp = Array.from(results).map(item => {
                    item.innerHTML;
                    console.log(item);
                });
                // console.log(temp);

                return temp;
            })

            // console.log(data);
            res.send('done');
        })
        .catch(error => {
            console.log('Error inside the scraper function.');
            console.log(error);
            res.send(`Error inside the scraper function. \n${error}`);
        })
}
    try {
        amazonSearch();
    } catch (error) {
        console.log('Amazon Search failed.');
        console.log(error);
        res.send('Amazon search failed.');
    }

});

// AMAZON PRIME BROWSER
// searchRouter.get('/', async (req, res) => {
//     // AMAZON 
//     let data;
//     const scrapeMovies = async () => {

//         const browser = await puppeteer.launch({headless: true});
//         const page = await browser.newPage();
        
//         // Make the viewport vertically huge to load more data at once
//         await page.setViewport({
//             width: 640,
//             height: 10000
//         });

//         await page.goto('https://www.amazon.com/gp/video/storefront/')
//             .then(() => console.log('Went to Amazon Prime Storefront.'));

//         // While the load more button exists, click it.
//         // When it's gone, pull the data from the dom.

//         // while (document.querySelector('[aria-label="Load more videos]') == true) {
            
//             // FILL IN LOOP LOGIC HERE

//         // }
//         await page.waitForSelector('.hC3fkr', {visible: true})
//             .then(() => console.log('Waited for selector.'))
//             .then(async () => {
//                 data = await page.evaluate(() => {
//                     const movies = document.querySelectorAll('.hC3fkr');
        
//                     const urls = Array.from(movies).map(item => item.innerHTML);
        
//                     return urls;
//                 })
//                 console.log(data);
//             })
//             .then(async () => {
//                 await browser.close();
//             });
//     }

//     await scrapeMovies()
//         .then(() => {
//             res.send(data);
//         });

// })


module.exports = searchRouter;