const express = require('express');

const reserveController = require('../controller/reserveController');

const router = express.Router();

router.post('/:propertyId/reserve', reserveController.createReserve);
router.get('/:propertyId/cardProperty', reserveController.getReserveRoom);

module.exports = router;
