const { Booking, Reserve, Property, PropertyImage } = require('../models');

exports.createBook = async (req, res, next) => {
	const { reserveId } = req.body;
	try {
		const reservedRoom = await Reserve.findOne({
			where: {
				id: reserveId,
			},
			attributes: [
				'guestsCount',
				'checkInDate',
				'checkOutDate',
				'amountPaid',
				'propertyId',
			],
		});
		// console.log(reservedRoom);
		const { guestsCount, checkInDate, checkOutDate, amountPaid, propertyId } =
			reservedRoom;
		const paymentInfo = req.tokenOmise;
		const bookedRoom = await Booking.create({
			userId: req.user.id,
			propertyId,
			guestsCount,
			checkInDate,
			checkOutDate,
			amountPaid,
			paymentInfo,
		});
		console.log('\n\n booked rooom --> \n\n', bookedRoom);
		next();
	} catch (err) {
		next(err);
	}
};

exports.getUserBooking = async (req, res, next) => {
	const { id } = req.user;
	const booking = await Booking.findAll({
		where: { userId: id },
		include: { model: Property, include: { model: PropertyImage } },
	});
	res.status(200).json({ booking });
};
