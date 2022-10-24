const express = require('express');
const propertyController = require('../controller/propertyController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', propertyController.getAllProperty);
router.get('/findproperty/:id', propertyController.getProperty);
router.get('/user', authenticate, propertyController.getPropertyByUser);

module.exports = router;
