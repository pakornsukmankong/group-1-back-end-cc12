const express = require('express');

const reserveController = require('../controller/reserveController');

const router = express.Router();

router.post('/', reserveController.createReserve);

module.exports = router;
