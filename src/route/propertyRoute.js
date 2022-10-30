const express = require('express');
const propertyController = require('../controller/propertyController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', propertyController.getAllProperty);
router.get('/category', propertyController.getPropertyByCategory);
router.get('/findproperty/:id', propertyController.getProperty);
router.get('/userproperty', authenticate, propertyController.getPropertyByUser);

router.delete('/delete/:propertyId', authenticate, propertyController.deleteProperty)

// wishlist

router.get('/getwishlist', authenticate, propertyController.getWishList);
router.post('/togglewishlist', authenticate, propertyController.toggleWishList);

module.exports = router;
