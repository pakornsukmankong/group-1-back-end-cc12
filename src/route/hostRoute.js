const express = require('express');
const upload = require('../middlewares/upload');
const hostController = require('../controller/hostController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/createhost', hostController.createHost);

module.exports = router;
