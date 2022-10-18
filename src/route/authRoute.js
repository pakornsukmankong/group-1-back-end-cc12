const express = require('express');
const router = express.Router();

const authContorller = require('../controller/authController');

router.post('/register', authContorller.register);
router.post('/login', authContorller.login);

module.exports = router;
