const express = require('express');
const router = express.Router();
const airlineController = require('../controller/airlineController');
const Auth = require('../middleware/verifyToken');


router.get("/", Auth, airlineController.getAllAirlines);

module.exports = router;