const express = require('express');
const facilityController = require('../controller/facilityController');

const router = express.Router();

router.post('/create', facilityController.createFacility);
router.post('/create-list', facilityController.createFacilityByList);
router.get('/list', facilityController.getFacilityList);

module.exports = router;
