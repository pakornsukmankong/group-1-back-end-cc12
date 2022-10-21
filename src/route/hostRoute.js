const express = require('express');
const upload = require('../middlewares/upload');
const hostController = require('../controller/hostController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/createhost', authenticate, hostController.createHost);
router.patch('/update/:id', authenticate, hostController.edithost);
router.delete('/delete/:id', authenticate, hostController.deletehost);

module.exports = router;
