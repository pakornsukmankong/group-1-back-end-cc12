const AppError = require('../utils/appError');
const { Property } = require('../models');

exports.createHost = async (req, res, next) => {
	try {
		const {
			propertyName,
			description,
			address,
			latitude,
			longitude,
			bedQty,
			bedRoomQty,
			bathRoomQty,
			pricePerDay,
			roomAvaliable,
		} = req.body;

		console.log(body);
		if (!propertyName || !String(propertyName)) {
			throw new AppError('propertyName is invalid', 400);
		}
		if (!address || !String(address)) {
			throw new AppError('address is Incorrect or not inserted', 400);
		}
		if (!bedQty || !String(bedQty)) {
			throw new AppError('Please include the number of beds', 400);
		}
		if (!bedRoomQty || !String(bedRoomQty)) {
			throw new AppError('Please include the number of bedrooms.', 400);
		}
		if (!bathRoomQty || !String(bathRoomQty)) {
			throw new AppError('Please include the number of bathrooms.', 400);
		}
		if (!pricePerDay || !String(bathRoomQty)) {
			throw new AppError('Please include the room rate per day', 400);
		}
		if (!roomAvaliable || !String(bathRoomQty)) {
			throw new AppError('Please include the number of rooms available.', 400);
		}
		const host = await Property.create({
			propertyName,
			description: description || null,
			address,
			latitude: latitude || null,
			longitude: longitude || null,
			bedQty,
			bedRoomQty,
			bathRoomQty,
			pricePerDay,
			roomAvaliable,
		});
		res.status(201).json(host);
	} catch (err) {
		next(err);
	}
};
