const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const cors = require('cors');
require('dotenv').config();

///////////////////////////////////////
// CORS CONFIGURATION
///////////////////////////////////////

// List of urls our API will accept calls from
const whitelist = [];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

///////////////////////////////////////
// CONTROLLERS
///////////////////////////////////////

const searchController = require('./controllers/searchController');

///////////////////////////////////////
// MIDDLEWARE
///////////////////////////////////////
app.use(cors(corsOptions));
app.use(express.json());

app.use('/search', searchController);

///////////////////////////////////////
// ROUTES
///////////////////////////////////////

// INDEX ROUTE
app.get('/', (req, res) => {
    res.send("Welcome to getHub API!");
});


///////////////////////////////////////
// LISTENING
///////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Port: ${PORT}`); 
    console.log("Hello, Seattle. I'm listening...");
});