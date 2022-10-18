const validator = require('validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

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
