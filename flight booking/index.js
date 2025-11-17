require('dotenv').config();
const connectDB = require('./db/config');
const path = require('path');
const userroute = require('./routes/userroute');
const flightRoute = require('./routes/flightRoute');
const express = require('express');


const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views')));


app.use('/api', userroute);

app.use('/api/flights', flightRoute);

app.use((req, res) => {
    res.status(404).send('Sorry, that page cannot be found!');
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});