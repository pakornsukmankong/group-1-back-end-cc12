// const validator = require('validator');

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
		phoneNumber = phoneNumber.split(0)[1];
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
				data: customerPhoneNumber.to,
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
				res.status(200).json({
					message: 'User is Verified!!',
					data,
				});
			}
		} catch (err) {
			console.log('User Varifired Error');
			res.status(404).send('User Varifired Error');
		}
	} else {
		res.status(400).json({
			message: 'Wrong phone number or code :(',
			// phonenumber: req.query.phonenumber,
			// data,
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
		const { firstName, lastName, email, password, phone } = req.body;
		if (firstName === '') {
			throw new AppError('firstName is invalid', 400);
		}
		if (lastName === '') {
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
			phone: phone || null,
			password: hashpassword,
		});

		const token = genToken({ id: user.id });
		res.status(201).json({ token });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (typeof email !== 'string' || typeof password !== 'string') {
			throw new AppError('email or password must not string', 400);
		}
		const user = await User.findOne({
			where: { [Op.or]: [{ email: email }] },
		});
		if (!user) {
			throw new AppError('email address or mobile or password is invalid', 400);
		}
		const isCorrect = await bcrypt.compare(password, user.password);
		if (!isCorrect) {
			throw new AppError('email or password is invalid', 400);
		}
		const token = genToken({ id: user.id });
		res.status(200).json({ token });
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

