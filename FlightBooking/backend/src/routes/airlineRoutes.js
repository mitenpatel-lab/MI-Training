const express = require('express');
const router = express.Router();
const airlineController = require('../controller/airlineController');
const Auth = require('../middleware/verifyToken');


router.get("/", Auth, airlineController.getAllAirlines);
router.get("/:Id", Auth, airlineController.getAirline);
router.post("/", Auth, airlineController.createAirline);
router.put("/:Id", Auth, airlineController.updateAirline);
router.delete("/:Id", Auth, airlineController.deleteAirline);

module.exports = router;