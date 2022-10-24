const express = require('express')

const paymentController = require('../controller/paymentController')
const bookingController = require('../controller/bookingController')
const reserveController = require('../controller/reserveController')

const router = express.Router()

require('dotenv').config()

router.post(
  '/',
  paymentController.createPayment,
  bookingController.createBook,
  reserveController.deleteReserve
)

module.exports = router
