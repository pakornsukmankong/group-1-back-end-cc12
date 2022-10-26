const { Reserve, Property, PropertyImage, User } = require('../models');

exports.createReserve = async (req, res, next) => {
	try {
		const propertyId = req.params.propertyId;
		const {
			pricePerDate,
			guestsCount,
			cleaningFees,
			amountPaid,
			serviceFees,
			checkInDate,
			checkOutDate,
		} = req.body;

		const data = {
			userId: req.user.id, // req.user.id from authenticate
			propertyId,
			pricePerDate,
			guestsCount,
			cleaningFees,
			amountPaid,
			serviceFees,
			checkInDate,
			checkOutDate,
		};

		const newReserve = await Reserve.create(data);
		res.status(201).json({ newReserve });
	} catch (err) {
		next(err);
	}
};

exports.getReserveRoom = async (req, res, next) => {
	const { reserveId } = req.params;

	try {
		// const userId = req.user.id // from authenticate
		const reservedRoom = await Reserve.findOne({
			where: { id: reserveId },
			include: [
				{
					model: Property,

					include: { model: PropertyImage, attributes: ['propertyImage'] },
				},
				{
					model: User,
					attributes: { exclude: 'password' },
				},
			],
		});
		console.log(reservedRoom);

		res.status(201).json({ room: reservedRoom });
	} catch (err) {
		next(err);
	}
};

exports.deleteReserve = async (req, res, next) => {
	try {
		await Reserve.destroy({
			where: {
				// userId: req.user.id,
				userId: 4,
			},
		});
		return res.status(200).json(req.omise);
	} catch (err) {
		next(err);
	}
};
