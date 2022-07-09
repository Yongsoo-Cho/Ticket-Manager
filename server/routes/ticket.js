const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/ticket');

router.post('/create', ticketController.createTicket);
router.delete('/:ticketId', ticketController.deleteTicket);
router.get('/:ticketId', ticketController.describeTicket);

router.post('/list', ticketController.listTickets);

module.exports = router;
