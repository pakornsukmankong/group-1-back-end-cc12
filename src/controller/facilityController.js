const AppError = require('../utils/appError');
const { Facility } = require('../models');

exports.createFacility = async (req, res, next) => {
  try {
    const { facilityName, facilityIconImage, list } = req.body;

    if (list && list.length) {
      const dataList = list.map((facility) => {
        return {
          facilityName: facility.facilityName,
          facilityIconImage: facility.facilityIconImage
        };
      });

      const resList = await Facility.bulkCreate(dataList);
      res.status(200).json({
        data: resList
      });
    }

    if (!facilityName || !String(facilityName)) {
      throw new AppError('facilityName is invalid', 400);
    }

    if (!facilityIconImage || !String(facilityIconImage)) {
      throw new AppError('facilityIconImage is invalid', 400);
    }

    // create facility one
    const facility = await Facility.create({
      facilityName: facilityName || null,
      facilityIconImage
    });
    res.status(201).json({ facility });
  } catch (err) {
    next(err);
  }
};

exports.getFacilityList = async (req, res, next) => {
  try {
    const facility = await Facility.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ data: facility });
  } catch (err) {
    next(err);
  }
};

// Mock data for facility
// {
//   "list": [
//       {
//           "facilityName": "Wifi",
//           "facilityIconImage": "fa-solid fa-wifi"
//       },
//       {
//           "facilityName": "TV",
//           "facilityIconImage": "fa-solid fa-tv"
//       },
//       {
//           "facilityName": "Kitchen",
//           "facilityIconImage": "fa-solid fa-kitchen-set"
//       },
//       {
//           "facilityName": "Washer",
//           "facilityIconImage": "fa-solid fa-soap"
//       },
//       {
//           "facilityName": "Free parking on premises",
//           "facilityIconImage": "fa-solid fa-square-parking"
//       },
//       {
//           "facilityName": "Pool",
//           "facilityIconImage": "fa-solid fa-water-ladder"
//       }
//   ]
// }
