const validator = require('validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const AppError = require('../utils/appError');
const { User } = require('../models');

const client = require('twilio')(
	process.env.ACCOUNT_SID, // process.env.ACCOUNT_SID,
	process.env.AUTH_TOKEN // process.env.AUTH_TOKEN
);

// <=== function send OTP ===>

exports.otp = async (req, res, next) => {
	let { phoneNumber } = req.body;

	// console.log(phoneNumber);

	if (phoneNumber.startsWith('0')) {
		phoneNumber = phoneNumber.slice(1);
	}

	// console.log(phoneNumber);

	if (phoneNumber.length === 9) {
		try {
			const customerPhoneNumber = await client.verify
				.services(process.env.SERVICE_ID) //process.env.SERVICE_ID
				.verifications.create({
					to: `+66${phoneNumber}`,
					channel: 'sms',
				});

			console.log(customerPhoneNumber);

			res.status(200).json({
				message: `Verification is sent to 0${phoneNumber}`,
				customerPhoneNumber: customerPhoneNumber.to,
			});
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({ message: 'Wrong Number!' });
	}
};

// <=== function verify OTP ===>

exports.verify = async (req, res, next) => {
	const { code, phoneNumber } = req.body;

	console.log(code, phoneNumber);

	if (code.length === 6) {
		try {
			const data = await client.verify
				.services(process.env.SERVICE_ID) //process.env.SERVICE_ID
				.verificationChecks.create({
					to: `${phoneNumber}`,
					code: code,
				});

			if (data.status === 'approved') {
				console.log('User is Verified!!');

				//  #############################################
				try {
					const user = await User.findOne({ where: { phone: phoneNumber } });
					if (user) {
						const token = genToken({ id: user.id });
						res.status(201).json({
							message: 'User is Verified!!',
							token: token,
							statusOtp: data.status,
							user,
						});
					}

					if (!user) {
						res.status(201).json({
							message: 'User is Verified!! but not regis yet',
							statusOtp: data.status,
						});
					}
				} catch (err) {
					next(err);
				}

				//  #############################################

				// res.status(200).json({
				// 	message: 'User is Verified!!',
				// 	data: data,
				// 	statusOtp: data.status,
				// });
			}
		} catch (err) {
			console.log('User Varifired Error');
			res.status(404).send('User Varifired Error');
		}
	} else {
		res.status(400).json({
			message: 'Wrong phone number or code :(',
		});
	}
};

// #################################################################################################

const genToken = (payload) =>
	jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
		expiresIn: process.env.JWT_EXPIRES || '1d',
	});

exports.register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, phoneNumber } = req.body;

		// console.log(req.body);

		if (!firstName) {
			throw new AppError('firstName is invalid', 400);
		}
		if (!lastName) {
			throw new AppError('lastName is invalid', 400);
		}
		if (!email) {
			throw new AppError('email is required', 400);
		}
		if (!password) {
			throw new AppError('password is required', 400);
		}
		const isEmail = validator.isEmail(email + '');
		if (!isEmail) {
			throw new AppError('email address is invalid', 400);
		}

		const hashpassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			email: isEmail && email,
			phone: phoneNumber || null,
			password: hashpassword,
		});

		const token = genToken({ id: user.id });
		console.log(token);
		res.status(201).json({ token });
	} catch (err) {
		next(err);
	}
};

exports.getMe = async (req, res) => {
	try {
		res.status(200).json({ user: req.user });
	} catch (err) {
		next(err);
	}
};

exports.loginWithEmail = async (req, res, next) => {
	const { email } = req.body;
	console.log(email);

	try {
		const user = await User.findOne({ where: { email: email } });
		if (user) {
			const token = genToken({ id: user.id });
			return res.status(200).json({ token });
		}
		res.status(400).json({ message: 'Invalid Credential' });
	} catch (err) {
		next(err);
	}
};

exports.updateProfile = async (req, res, next) => {
	try {
		const { id } = req.user;
		const {
			firstName,
			lastName,
			gender,
			phoneNumber,
			email,
			currentPassword,
			newPassword,
		} = req.body;

		// console.log(currentPassword, 'currentPassword');
		// console.log(newPassword, 'newPassword');

		const data = {};

		if (firstName) {
			data.firstName = firstName;
		}

		if (lastName) {
			data.lastName = lastName;
		}

		if (gender) {
			data.gender = gender;
		}

		if (phoneNumber) {
			data.phone = phoneNumber;
		}

		if (email) {
			data.email = email;
		}

		if (currentPassword) {
			const user = await User.findOne({
				where: { id },
			});
			const correctPassword = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (!correctPassword) {
				return res
					.status(400)
					.json({ message: "Current Password Isn't Corrct " });
			}

			const hashNewPassword = await bcrypt.hash(newPassword, 10);

			data.password = hashNewPassword;
		}

		if (req.file) {
			profileImage = await cloudinary.upload(req.file.path);
		}

		const updateUser = await User.update(data, {
			where: { id },
		});

		res.status(200).json({ message: 'Update Success', updateUser });
	} catch (err) {
		next(err);
	}
};
