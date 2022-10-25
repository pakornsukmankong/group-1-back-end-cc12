const express = require('express');
const upload = require('../middlewares/upload');
const hostController = require('../controller/hostController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/list', authenticate, hostController.getHostList);
router.get('/filter', hostController.filterHostByCategory);
router.post('/create/property-type', authenticate, hostController.createHost);
router.patch('/update/category', authenticate, hostController.updateCategory);
router.patch('/update/location', authenticate, hostController.updateLocation);
router.patch(
  '/update/floor-plan',
  authenticate,
  hostController.updateFloorPlan
);
router.patch('/update/facility', authenticate, hostController.updateFacility);
router.patch(
  '/update/photo',
  authenticate,
  upload.fields([{ name: 'photos' }]),
  hostController.updatePhoto
);
router.patch('/update/title', authenticate, hostController.updateTitle);
router.patch(
  '/update/description',
  authenticate,
  hostController.updateDescription
);
router.patch('/update/price', authenticate, hostController.updatePrice);
router.patch('/update/preview', authenticate, hostController.savePreview);

module.exports = router;
