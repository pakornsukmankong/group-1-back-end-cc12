const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { User } = require('../models');

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization || !authorization.startsWith('Bearer')) {
			throw new AppError('you are unauthenticated', 401);
		}

		const token = authorization.split(' ')[1];
		if (!token) {
			throw new AppError('unauthenticated', 401);
		}

		const payload = jwt.verify(
			token,
			process.env.JET_SECRET_KEY || 'private_key'
		);

		const user = await User.findOne({
			where: { id: payload.id },
			attributes: { exclude: 'password' },
		});
		if (!user) {
			throw new AppError('unauthenticated', 401);
		}

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};
