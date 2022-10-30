const { Op } = require('sequelize');

const { HOST_ACTIVE } = require('../config/constants');
const {
  Property,
  User,
  PropertyType,
  PropertyImage,
  Wishlist,
  PropertyFacility,
  Facility,
  PropertyCategory,
  sequelize
} = require('../models');
const cloudinary = require('../utils/cloudinary')
const AppError = require('../utils/appError');

exports.getAllProperty = async (req, res, next) => {
  try {
    const property = await Property.findAll({
      where: { hostStatus: HOST_ACTIVE },
      order: [['createdAt', 'DESC']],
      // attributes: { exclude: ['userHostId', 'propertyTypeId'] },
      include: [
        {
          model: User,
          attributes: { exclude: 'password' }
        },
        { model: PropertyType },
        { model: PropertyImage }
      ]
    });

    res.status(201).json({ property });
  } catch (err) {
    next(err);
  }
};

exports.getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const property = await Property.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: 'password' }
        },
        { model: PropertyType },
        { model: PropertyImage },
        {
          model: PropertyFacility,
          include: [
            {
              model: Facility
            }
          ]
        }
      ]
    });
    res.status(201).json({ property });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyByUser = async (req, res, next) => {
  try {    
    const property = await Property.findAll({
      where: { userHostId: req.user.id },
      attributes: { exclude: ['userHostId', 'propertyTypeId'] },
      include: [
        {
          model: User,
          attributes: { exclude: 'password' }
        },
        { model: PropertyType },
        { model: PropertyImage }
      ]
    });
    res.status(201).json({ property });
  } catch (err) {
    next(err);
  }
};

exports.getWishList = async (req, res,next) => {
  try{
    const userId = req.user.id;
    const findWishListByUser = await Wishlist.findAll({
      where: { userId: userId },
      include: { model: Property, include: { model: PropertyImage } }
    });
    res.status(200).json({ findWishListByUser });
  }catch(err) {
    next(err)
  }
};

exports.toggleWishList = async (req, res, next) => {
  const userId = req.user.id;
  const { propertyId } = req.body;
  try {
    const removeWishList = await Wishlist.findOne({
      where: { userId, propertyId }
    });

    if (removeWishList) {
      // console.log(removeWishList);
      await removeWishList.destroy();
      return res.status(201).json({ removeWishList });
    }

    const addWishList = await Wishlist.create({
      userId,
      propertyId
    });

    return res.status(201).json({ addWishList });
  } catch (err) {
    next(err)
  }
};

exports.getPropertyByCategory = async (req, res, next) => {
  try {
    const { id: categoryId, search: textSearch } = req.query;
    const searchQuery = textSearch
      ? {
          propertyName: {
            [Op.like]: `%${textSearch}%`
          }
        }
      : null;

    const categoryQuery = categoryId
      ? {
          categoryId
        }
      : null;

    const property = await Property.findAll({
      where: {
        hostStatus: HOST_ACTIVE,
        ...searchQuery
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: PropertyCategory,
          where: { ...categoryQuery }
        },
        {
          model: User,
          attributes: { exclude: 'password' }
        },
        { model: PropertyType },
        { model: PropertyImage }
      ]
    });
    res.status(200).json({ property });
  } catch (err) {
    next(err);
  }
};

exports.deleteProperty = async(req,res,next) => {
  let t
  try{
    t = await sequelize.transaction();
    const {propertyId} = req.params
    const property = await Property.findOne({where: {id: propertyId}})

    if(!property) {
      throw new AppError('property not found', 400)
    }
    if(req.user.id !== property.userHostId) {
      throw new AppError('no permission to delete', 403)
    }

    const getPropertyImages = await PropertyImage.findAll({where: {propertyId}})
    
    if (getPropertyImages) {
      const multiplePropertyImagesPromise = getPropertyImages.map(async (image) => {
        const secureUrl = await cloudinary.getPublicId(image.propertyImage);
        return {
          propertyImage: secureUrl,
          propertyId: propertyId
        };
      });

      let uploadResponses = await Promise.all(multiplePropertyImagesPromise);

      console.log(uploadResponses);

    res.status(200).json({getPropertyImages})

    }
  }catch(err) {
    next(err)
  }
}
