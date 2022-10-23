const AppError = require('../utils/appError');
const {
  Property,
  User,
  Province,
  District,
  Subdistrict,
  PropertyType
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
      subdistrictId
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

    const province = await Province.findOne({ where: { id: provinceId } });

    const district = await District.findOne({ where: { id: districtId } });

    const propertyType = await PropertyType.findOne({
      where: { id: propertyTypeId }
    });
    const subdistrict = await Subdistrict.findOne({
      where: { id: subdistrictId }
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
      roomAvailable,
      userHostId: user.id,
      provinceId: province.id,
      districtId: district.id,
      subdistrictId: subdistrict.id,
      propertyTypeId: propertyType.id
    });
    res.status(201).json({ host });
  } catch (err) {
    next(err);
  }
};

exports.deletehost = async (req, res, next) => {
  try {
    console.log('delete');
    const { id } = req.params;
    const post = await Property.destroy({
      where: { id, userHostId: req.user.id }
    });
    console.log(post);
    res.status(201).json({ message: 'success delete' });
  } catch (err) {
    next(err);
  }
};
// feature edit
exports.edithost = async (req, res, next) => {
  try {
    const data = { userId: req.user.id };
    const { id } = req.params;
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
      subdistrictId
    } = req.body;
    if (propertyName && propertyName.trim()) {
      data.propertyName = propertyName;
    }
    if (description && description.trim()) {
      data.description = description;
    }
    if (address && address.trim()) {
      data.address = address;
    }
    if (latitude) {
      data.latitude = latitude;
    }
    if (longitude) {
      data.longitude = longitude;
    }
    if (bedQty) {
      data.bedQty = bedQty;
    }
    if (bedRoomQty) {
      data.bedRoomQty = bedRoomQty;
    }
    if (bathRoomQty) {
      data.bathRoomQty = bathRoomQty;
    }
    if (pricePerDate) {
      data.pricePerDate = pricePerDate;
    }
    if (roomAvaliable) {
      data.roomAvaliable = roomAvaliable;
    }
    // id from model form
    const findedProperty = await Property.findOne({ where: { id } });
    const post = await Property.update(data, {
      where: { id: findedProperty.id }
    });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.createHostByPropertyType = async (req, res, next) => {
  try {
    const { propertyTypeId } = req.body;

    if (!propertyTypeId || !String(propertyTypeId)) {
      throw new AppError('propertyTypeId is invalid', 400);
    }

    // create property type id
    const host = await Property.create({
      propertyTypeId: propertyTypeId
    });
    res.status(201).json({ host });
  } catch (err) {
    next(err);
  }
};
