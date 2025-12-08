require('dotenv').config();
const connectDB = require('../backend/src/db/config');
const userRoutes = require('./src/routes/userroute');
const flightRoutes = require('./src/routes/flightRoute');
const airlineRoutes = require('./src/routes/airlineRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const express = require('express');
const cors = require('cors');
const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const BASE_URL = '/api';

app.use(`${BASE_URL}`, userRoutes);
app.use(`${BASE_URL}/flights`, flightRoutes);
app.use(`${BASE_URL}/airline`, airlineRoutes);
app.use(`${BASE_URL}/ticket`, ticketRoutes);




app.use((req, res) => {
    res.status(404).send('Sorry, that page cannot be found!');
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});