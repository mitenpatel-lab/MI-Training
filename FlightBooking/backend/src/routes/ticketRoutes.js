const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticketController');
const Auth = require('../middleware/verifyToken');

router.get("/", Auth, ticketController.getAllTickets);
router.get("/:Id", Auth, ticketController.getTicketDetails);
router.post("/", Auth, ticketController.createTicket);
router.delete("/:Id", Auth, ticketController.deleteTicket);

module.exports = router;