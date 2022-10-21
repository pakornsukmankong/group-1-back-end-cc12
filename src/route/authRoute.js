const express = require('express');
const upload = require('../middlewares/upload');
const authContorller = require('../controller/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

console.log('test');
router.get('/me', authenticate, authContorller.getMe);
router.post('/register', authContorller.register);
router.post('/sendotp', authContorller.otp);
router.post('/verify', authContorller.verify);

module.exports = router;
