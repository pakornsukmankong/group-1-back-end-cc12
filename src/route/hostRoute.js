const express = require('express');
const upload = require('../middlewares/upload');
const hostController = require('../controller/hostController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// router.post('/createhost', authenticate, hostController.createHost);
// router.patch('/update/:id', authenticate, hostController.edithost);
// router.delete('/delete/:id', authenticate, hostController.deletehost);

router.post(
  '/create/property-type',
  authenticate,
  hostController.createHostByPropertyType
);
// router.patch('/update/:id/category', authenticate, hostController.category);
// router.patch('/update/:id/location', authenticate, hostController.location);
// router.patch('/update/:id/floor-plan', authenticate, hostController.floorPlan);
// router.patch('/update/:id/facility', authenticate, hostController.facility);
// router.patch('/update/:id/photo', authenticate, hostController.photo);
// router.patch('/update/:id/title', authenticate, hostController.title);
// router.patch('/update/:id/description', authenticate, hostController.description);
// router.patch('/update/:id/price', authenticate, hostController.price);
// router.patch('/update/:id/preview', authenticate, hostController.preview);

module.exports = router;
