const express = require('express');

const reserveController = require('../controller/reserveController');

const router = express.Router();

router.post('/:propertyId/reserve', reserveController.createReserve);
router.get('/:reserveId/cardProperty', reserveController.getReserveRoom);
router.get('/:propertyId', reserveController.getStatusBookingByPropertyId);

module.exports = router;
