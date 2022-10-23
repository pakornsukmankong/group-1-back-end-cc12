const express = require('express');
const propertyTypeController = require('../controller/propertyTypeController');

const router = express.Router();

router.post('/create', propertyTypeController.createPropertyType);
router.post('/create-list', propertyTypeController.createPropertyTypeByList);
router.get('/list', propertyTypeController.getPropertyList);

module.exports = router;
