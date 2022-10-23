const AppError = require('../utils/appError');
const { PropertyType } = require('../models');

exports.createPropertyType = async (req, res, next) => {
  try {
    const { propertyTypeName, propertyTypeIconImage, list } = req.body;

    if (list && list.length) {
      const dataList = list.map((propertyType) => {
        return {
          propertyTypeName: propertyType.propertyTypeName,
          propertyTypeIconImage: propertyType.propertyTypeIconImage
        };
      });

      const resList = await PropertyType.bulkCreate(dataList);
      res.status(200).json({
        data: resList
      });
    }

    if (!propertyTypeName || !String(propertyTypeName)) {
      throw new AppError('propertyTypeName is invalid', 400);
    }

    if (!propertyTypeIconImage || !String(propertyTypeIconImage)) {
      throw new AppError('propertyTypeIconImage is invalid', 400);
    }

    // create property type one
    const propertyType = await Property.create({
      propertyTypeName: propertyTypeName || null,
      propertyTypeIconImage
    });
    res.status(201).json({ propertyType });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyList = async (req, res, next) => {
  try {
    const propertyType = await PropertyType.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ data: propertyType });
    return propertyType;
  } catch (err) {
    next(err);
  }
};

// Mock data for property type
// {
//   "list": [
//       {
//           "propertyTypeName": "Apartment",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/eadbcbdb-d57d-44d9-9a76-665a7a4d1cd7.jpg"
//       },
//       {
//           "propertyTypeName": "House",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/d1af74db-58eb-46bf-b3f5-e42b6c9892db.jpg"
//       },
//       {
//           "propertyTypeName": "Secondary unit",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/32897901-1870-4895-8e23-f08dc0e61750.jpg"
//       },
//       {
//           "propertyTypeName": "Unique space",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/7ad56bb1-ed9f-4dcb-a14c-2523da331b44.jpg"
//       },
//       {
//           "propertyTypeName": "Bed and breakfast",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/d52fb4e7-39a4-46df-9bf9-67e56d35eeca.jpg"
//       },
//       {
//           "propertyTypeName": "Boutique hotel",
//           "propertyTypeIconImage": "https://a0.muscache.com/im/pictures/a2c9ad21-b159-4fd2-b417-d810fb23c6a9.jpg"
//       }
//   ]
// }
