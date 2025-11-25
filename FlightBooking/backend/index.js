require('dotenv').config();
const connectDB = require('../backend/src/db/config');
const userroute = require('./src/routes/userroute');
const flightRoute = require('./src/routes/flightRoute');
const airlineRoutes = require('./src/routes/airlineRoutes');

const express = require('express');
const cors = require('cors')
const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', userroute);

app.use('/api/flights', flightRoute);
app.use('/api/airline', airlineRoutes);

app.use((req, res) => {
    res.status(404).send('Sorry, that page cannot be found!');
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});