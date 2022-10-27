const { Op } = require('sequelize');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const {
  Property,
  PropertyCategory,
  PropertyFacility,
  PropertyImage,
  Category,
  PropertyType,
  User
} = require('../models');
const { HOST_ACTIVE } = require('../config/constants');

exports.getHostList = async (req, res, next) => {
  try {
    const host = await Property.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ data: host });
  } catch (err) {
    next(err);
  }
};

exports.filterHostByCategory = async (req, res, next) => {
  try {
    const { cat: categoryId } = req.query;
    const host = await PropertyCategory.findAll({
      where: { categoryId: categoryId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Property
        }
      ]
    });
    res.status(200).json({ data: host });
  } catch (err) {
    next(err);
  }
};

exports.createHost = async (req, res, next) => {
  try {
    const { propertyTypeId } = req.body;

    if (!propertyTypeId || !String(propertyTypeId)) {
      throw new AppError('propertyTypeId is invalid', 400);
    }

    // create property type id
    const host = await Property.create({
      userHostId: req.user.id, // req.user.id from authenticate
      propertyTypeId: propertyTypeId
    });
    res.status(201).json({ host });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { propertyId, list } = req.body;

    if (!Array.isArray(list)) {
      throw new AppError('list is invalid', 400);
    }

    if (!propertyId || !Number(propertyId)) {
      throw new AppError('propertyId is invalid', 400);
    }

    const findPropertyId = await PropertyCategory.findAll({
      where: {
        propertyId
      }
    });

    if (findPropertyId) {
      await PropertyCategory.destroy({
        where: {
          propertyId
        }
      });
    }

    if (list && list.length) {
      const dataList = list.map((category) => {
        return {
          propertyId,
          categoryId: category.categoryId
        };
      });
      const resList = await PropertyCategory.bulkCreate(dataList);
      res.status(201).json({
        message: `Update category Success by propertyId:${propertyId}`,
        data: resList
      });
    } else {
      res.status(500).json({ message: 'please fill category list' });
    }
    // TODO: check case another user created
  } catch (err) {
    next(err);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { propertyId, address, latitude, longitude } = req.body;

    if (!address || !String(address)) {
      throw new AppError('address is invalid', 400);
    }

    if (!latitude || !String(latitude)) {
      throw new AppError('latitude is invalid', 400);
    }

    if (!longitude || !String(longitude)) {
      throw new AppError('longitude is invalid', 400);
    }

    const data = {
      address,
      latitude,
      longitude
    };

    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });

    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }

    res.status(201).json({
      message: `Update Location Success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFloorPlan = async (req, res, next) => {
  try {
    const { propertyId, guestQty, bedQty, bedRoomQty, bathRoomQty } = req.body;

    if (!guestQty || !Number(guestQty)) {
      throw new AppError('guestQty is invalid', 400);
    }

    if (!bedQty || !Number(bedQty)) {
      throw new AppError('bedQty is invalid', 400);
    }

    if (!bedRoomQty || !Number(bedRoomQty)) {
      throw new AppError('bedRoomQty is invalid', 400);
    }

    if (!bathRoomQty || !Number(bathRoomQty)) {
      throw new AppError('bedRoomQty is invalid', 400);
    }

    const data = {
      guestQty,
      bedQty,
      bedRoomQty,
      bathRoomQty
    };

    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });

    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }

    res.status(201).json({
      message: `Update FloorPlan Success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFacility = async (req, res, next) => {
  try {
    const { propertyId, list } = req.body;

    if (!Array.isArray(list)) {
      throw new AppError('list is invalid', 400);
    }

    const findPropertyId = await PropertyFacility.findAll({
      where: { propertyId }
    });

    if (findPropertyId) {
      await PropertyFacility.destroy({
        where: {
          propertyId
        }
      });
    }

    if (list && list.length) {
      const dataList = list.map((facility) => {
        return {
          propertyId: propertyId,
          facilityId: facility.facilityId
        };
      });
      const resList = await PropertyFacility.bulkCreate(dataList);
      res.status(201).json({
        message: `Update facility Success by propertyId:${propertyId}`,
        data: resList
      });
    } else {
      res.status(500).json({ message: 'please facility category list' });
    }
    // TODO: check case another user created
  } catch (err) {
    next(err);
  }
};

exports.updatePhoto = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const { photos } = req.files;

    if (!Array.isArray(photos)) {
      throw new AppError('photos is invalid', 400);
    }
    if (photos && photos.length) {
      const multiplePhotoPromise = photos.map(async (photo) => {
        const secureUrl = await cloudinary.upload(photo.path, 'host');
        return {
          propertyImage: secureUrl,
          propertyId: propertyId
        };
      });

      let uploadResponses = await Promise.all(multiplePhotoPromise);

      const resList = await PropertyImage.bulkCreate(uploadResponses);
      res.status(201).json({
        data: resList
      });
    } else {
      res.status(500).json({ message: 'please fill photos' });
    }
    // TODO: check case another user created
  } catch (err) {
    next(err);
  }
};

exports.updateTitle = async (req, res, next) => {
  try {
    const { propertyId, title } = req.body;

    if (!title || !String(title)) {
      throw new AppError('title is invalid', 400);
    }

    const data = {
      propertyName: title
    };

    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });

    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }

    res.status(201).json({
      message: `Update Title Success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDescription = async (req, res, next) => {
  try {
    const { propertyId, description } = req.body;
    if (!description || !String(description)) {
      throw new AppError('description is invalid', 400);
    }
    const data = {
      description
    };
    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });
    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }
    res.status(201).json({
      message: `Update description Success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePrice = async (req, res, next) => {
  try {
    const { propertyId, pricePerDate } = req.body;

    if (!pricePerDate || !Number(pricePerDate)) {
      throw new AppError('pricePerDate is invalid', 400);
    }

    const data = {
      pricePerDate
    };

    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });

    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }

    res.status(201).json({
      message: `Update pricePerDate Success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.savePreview = async (req, res, next) => {
  try {
    const { propertyId } = req.body;

    const data = {
      hostStatus: HOST_ACTIVE
    };

    const updateStatus = await Property.update(data, {
      where: {
        id: propertyId,
        userHostId: req.user.id // req.user.id from authenticate
      }
    });

    if (!updateStatus[0]) {
      throw new AppError(`Cannot found propertyId:${propertyId}`, 403);
    }

    res.status(201).json({
      message: `Update save preview success by propertyId:${propertyId}`
    });
  } catch (err) {
    next(err);
  }
};

exports.getPreview = async (req, res, next) => {
  try {
    const { id: propertyId } = req.query;
    const host = await Property.findAll({
      // raw: true,
      where: { id: propertyId, userHostId: req.user.id },
      attributes: { exclude: ['userHostId', 'propertyTypeId'] },
      include: [
        { model: User },
        { model: PropertyType },
        {
          model: PropertyCategory,
          include: {
            model: Category
          }
        },
        { model: PropertyFacility },
        { model: PropertyImage }
      ]
    });

    res.status(200).json({ data: host });
  } catch (err) {
    next(err);
  }
};
