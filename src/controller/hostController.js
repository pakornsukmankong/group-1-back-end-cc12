const AppError = require('../utils/appError');
const {
	Property,
	User,
	Provice,
	District,
	Subdistrict,
	PropertyType,
} = require('../models');

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
			userHostId,
			provinceId,
			districtId,
			propertyTypeId,
			subdistrictId,
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

		// id from model
		const user = User.findOne({ where: { id: req.user.id } });
		const province = Provice.findOne({ where: { id: provinceId } });
		const district = District.findOne({ where: { id: districtId } });
		const propertyType = PropertyType.findOne({
			where: { id: propertyTypeId },
		});
		const subdistrict = Subdistrict.findOne({ where: { id: subdistrictId } });

		// host create House
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
			userHostId: user.id,
			provinceId: province.id,
			districtId: district.id,
			subdistrictId: subdistrict.id,
			propertyTypeId: propertyType.id,
		});
		res.status(201).json(host);
	} catch (err) {
		next(err);
	}
};
