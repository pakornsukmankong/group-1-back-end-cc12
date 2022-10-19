// const validator = require('validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const client = require('twilio')(
	process.env.ACCOUNT_SID, // process.env.ACCOUNT_SID,
	process.env.AUTH_TOKEN // process.env.AUTH_TOKEN
);

// <=== function send OTP ===>

exports.otp = async (req, res, next) => {
	let { phoneNumber } = req.body;

	if (phoneNumber.startsWith(0)) {
		phoneNumber = phoneNumber.split(0)[1];
	}

	if (phoneNumber.length === 9 && phoneNumber.startsWith('+66')) {
		try {
			const customerPhoneNumber = await client.verify
				.services(process.env.SERVICE_ID) //process.env.SERVICE_ID
				.verifications.create({
					to: `+66${phoneNumber}`,
					channel: 'sms',
				});

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
					to: `+66${phoneNumber}`,
					code: code,
				});

			if (data.status === 'approved') {
				res.status(200).json({
					message: 'User is Verified!!',
				});
			}
		} catch (err) {
			res.status(404).send('User Varifired Error');
		}
	} else {
		res.status(400).send({
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

		const hashPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashPassword,
			phone,
			confirmPassword,
		});

		console.log(user);
		const token = genToken({
			id: user.id,
			role: user.role,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			// payload ที่ส่งไปให้กับ token
		});
		console.log(token);
		res.status(201).json({ token });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (typeof email !== 'string' || typeof password !== 'string') {
			throw new AppError('Email or Password is invalid', 400);
		}

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			throw new AppError('Email is invalid', 400);
		}

		const correctPassword = await bcrypt.compare(password, user.password);

		if (!correctPassword) {
			throw new AppError('Password is invalid', 400);
		}

		const token = genToken({
			id: user.id,
			role: user.role,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
		});
		res.status(201).json({ token });
	} catch (err) {
		next(err);
	}
};
