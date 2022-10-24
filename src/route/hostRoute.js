const express = require('express');
const upload = require('../middlewares/upload');
const hostController = require('../controller/hostController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/createhost', authenticate, hostController.createHost);
router.patch('/update/:id', authenticate, hostController.edithost);
router.delete('/delete/:id', authenticate, hostController.deletehost);

router.post(
  '/create/property-type',
  authenticate,
  hostController.createHostByPropertyType
);

// router.patch('/update/location', authenticate, hostController.location);
// router.patch('/update/floor-plan', authenticate, hostController.floor-plan);
// router.patch('/update/facility', authenticate, hostController.facility);
// router.patch('/update/photo', authenticate, hostController.photo);
// router.patch('/update/title', authenticate, hostController.title);
// router.patch('/update/description', authenticate, hostController.description);
// router.patch('/update/price', authenticate, hostController.price);
// router.patch('/update/preview', authenticate, hostController.preview);

module.exports = router;
