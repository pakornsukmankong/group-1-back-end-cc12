const express = require('express');
const upload = require('../middlewares/upload');
const authContorller = require('../controller/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/me', authenticate, authContorller.getMe);
router.post('/register', authContorller.register);
router.post('/sendotp', authContorller.otp);
router.post('/verify', authContorller.verify);
router.post('/loginwithemail', authContorller.loginWithEmail);

module.exports = router;
