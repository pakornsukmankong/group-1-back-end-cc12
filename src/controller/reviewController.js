const { Property, User, Booking, PropertyReview } = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

exports.createReview = async (req, res, next) => {
	try {
		const { propertyId } = req.params;
		const { comment } = req.body;

		if (!comment || !String(comment)) {
			throw new AppError('comment is invalid', 400);
		}
		const book = await Booking.findOne({
			where: { [Op.and]: [{ userId: req.user.id }, { propertyId }] },
		});

		if (!book) {
			throw new AppError('you are not booking yet', 400);
		}

		const checkReview = await PropertyReview.findOne({
			where: {
				[Op.and]: [{ propertyId: propertyId }, { userId: req.user.id }],
			},
		});

		if (checkReview) {
			throw new AppError('you already reviewed', 400);
		}
		const review = await PropertyReview.create({
			comment,
			userId: req.user.id,
			propertyId: propertyId,
			bookingId: book.id,
		});

		res.status(201).json({ review });
	} catch (err) {
		next(err);
	}
};

exports.getAllReviewByPropertyId = async (req, res, next) => {
	try {
		const { propertyId } = req.params;

		const review = await PropertyReview.findAll({
			where: { propertyId },
			// attributes: { exclude: ['userHostId', 'propertyId', 'bookingId'] },
			include: { model: User, attributes: { exclude: ['password'] } },
			order:[['createdAt', 'DESC']],
		});
		res.status(201).json({ review });
	} catch (err) {
		next(err);
	}
};
