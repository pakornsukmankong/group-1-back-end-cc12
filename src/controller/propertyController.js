const { Property, User, PropertyType } = require('../models');

exports.getAllProperty = async (req, res, next) => {
	try {
		const post = await Property.findAll({
			include: { model: User, attributes: { exclude: 'password' } },
		});

		res.status(201).json({ post });
	} catch (err) {
		next(err);
	}
};

exports.getProperty = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await Property.findOne({
			where: { id },
			include: [
				{
					model: User,
					attributes: { exclude: 'password' },
				},
				{ model: PropertyType },
			],
		});
		res.status(201).json({ post });
	} catch (err) {
		next(err);
	}
};

exports.getPropertyByUser = async (req, res, next) => {
	try {
		const propertyUser = await Property.findAll({
			where: { userHostId: req.user.id },

			include: [
				{
					model: User,
					attributes: { exclude: 'password' },
				},
				{ model: PropertyType },
			],
		});
		res.status(201).json({ propertyUser });
	} catch (err) {
		next(err);
	}
};
