const express = require('express');
const router = express.Router();
const flightController = require('../controller/flightController');
const Auth = require('../middleware/verifyToken');


router.get("/", Auth, flightController.getAllFlights);
router.post("/", Auth, flightController.createFlight);
router.put("/:Id", Auth, flightController.updateFlight);

router.put("/status/:Id", Auth, flightController.updateFlightStatus);
router.delete("/:Id", Auth, flightController.deleteFlight);
router.get("/:Id", Auth, flightController.getFlightById);
module.exports = router;