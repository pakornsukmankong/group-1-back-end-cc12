const express = require('express');
const router = express.Router();

const authContorller = require('../controller/authController');

router.post('/sendotp', authContorller.otp);
router.post('/verify', authContorller.verify);

module.exports = router;
