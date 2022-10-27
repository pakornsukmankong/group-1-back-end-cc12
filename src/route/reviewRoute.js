const express = require('express');
const reviewController = require('../controller/reviewController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post(
	'/createReview/:propertyId',
	authenticate,
	reviewController.createReview
);
router.get('/:propertyId', reviewController.getAllReviewByPropertyId);
module.exports = router;
