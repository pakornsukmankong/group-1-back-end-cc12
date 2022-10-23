const express = require('express');
const propertyTypeController = require('../controller/propertyTypeController');

const router = express.Router();

router.post('/create', propertyTypeController.createPropertyType);
router.get('/list', propertyTypeController.getPropertyList);

module.exports = router;
