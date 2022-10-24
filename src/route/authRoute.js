const express = require('express');
const upload = require('../middlewares/upload');
const authController = require('../controller/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/me', authenticate, authController.getMe);
router.post('/register', authController.register);
router.post('/sendotp', authController.otp);
router.post('/verify', authController.verify);
router.post('/loginwithemail', authController.loginWithEmail);

router.patch(
	'/updateprofile',
	authenticate,
	upload.single('profileImage'),
	authController.updateProfile
);

module.exports = router;
