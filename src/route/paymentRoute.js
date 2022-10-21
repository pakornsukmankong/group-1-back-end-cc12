const express = require('express');

const paymentController = require('../controller/paymentController');
const router = express.Router();

require('dotenv').config();

router.post('/', paymentController.createPayment);

module.exports = router;
