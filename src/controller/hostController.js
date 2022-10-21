const AppError = require('../utils/appError');
const {
	Property,
	User,
	Province,
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
			pricePerDate,
			roomAvaliable,
			provinceId,
			districtId,
			propertyTypeId,
			subdistrictId,
		} = req.body;

		// console.log(req.body);

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
		if (!pricePerDate || !String(bathRoomQty)) {
			throw new AppError('Please include the room rate per day', 400);
		}
		if (!roomAvaliable || !String(bathRoomQty)) {
			throw new AppError('Please include the number of rooms available.', 400);
		}

		// id from model
		const user = await User.findOne({ where: { id: req.user.id } });
		console.log(user, 'user');
		const province = await Province.findOne({ where: { id: provinceId } });
		console.log(province, 'province');
		const district = await District.findOne({ where: { id: districtId } });
		// console.log(req);
		const propertyType = await PropertyType.findOne({
			where: { id: propertyTypeId },
		});
		const subdistrict = await Subdistrict.findOne({
			where: { id: subdistrictId },
		});

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
			pricePerDate,
			roomAvaliable,
			userHostId: user.id,
			provinceId: province.id,
			districtId: district.id,
			subdistrictId: subdistrict.id,
			propertyTypeId: propertyType.id,
		});
		res.status(201).json({ host });
	} catch (err) {
		next(err);
	}
};
