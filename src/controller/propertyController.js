const Sequelize = require('sequelize');

const { HOST_ACTIVE } = require('../config/constants');
const {
  Property,
  User,
  PropertyType,
  PropertyImage,
  Wishlist,
  PropertyFacility,
  Facility,
  PropertyCategory
} = require('../models');

exports.getAllProperty = async (req, res, next) => {
  try {
    const property = await Property.findAll({
      where: { hostStatus: HOST_ACTIVE },
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
    const propertyUser = await Property.findAll({
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
    res.status(201).json({ propertyUser });
  } catch (err) {
    next(err);
  }
};

exports.getWishList = async (req, res) => {
  const userId = req.user.id;
  const findWishListByUser = await Wishlist.findAll({
    where: { userId: userId },
    include: { model: Property, include: { model: PropertyImage } }
  });
  res.status(200).json({ findWishListByUser });
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
  } catch (err) {}
};

exports.getPropertyByCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.query;
    const property = await Property.findAll({
      where: { hostStatus: HOST_ACTIVE },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: PropertyCategory,
          where: { categoryId }
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
