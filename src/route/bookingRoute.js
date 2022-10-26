const express = require('express');
const bookingController = require('../controller/bookingController');
// const upload = require('../middlewares/upload');
// const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/getuserbooking', bookingController.getUserBooking);

module.exports = router;
