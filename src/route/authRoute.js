const express = require('express');
const upload = require('../middlewares/upload');
const authContorller = require('../controller/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();
router.post('/register', upload.none(), authContorller.register);
router.post('/login', authContorller.login);
router.get('/me', authenticate, authContorller.getMe);

module.exports = router;
