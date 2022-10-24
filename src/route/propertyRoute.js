const express = require('express');
const propertyController = require('../controller/propertyController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', propertyController.getAllProperty);
router.get('/findproperty/:id', propertyController.getProperty);
router.get('/user', authenticate, propertyController.getPropertyByUser);

// wishlist
// router.post('/addwishlist', authenticate, propertyController.addWishList);
// router.delete(
// 	'/removewishlist',
// 	authenticate,
// 	propertyController.removeWishList
// );

router.get('/getwishlist', authenticate, propertyController.getWishList);
router.post('/togglewishlist', authenticate, propertyController.toggleWishList);

module.exports = router;
