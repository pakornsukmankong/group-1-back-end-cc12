const { Reserve } = require('../models');

exports.createReserve = async (req, res, next) => {
  try {
    const {
      propertyId, // send from frontEnd
      pricePerDate,
      guestsCount,
      cleaningFees,
      amountPaid,
      serviceFees,
      checkInDate,
      checkOutDate,
    } = req.body;

    const data = {
      userId: req.user.id, // req.user.id from authenticate
      propertyId,
      pricePerDate,
      guestsCount,
      cleaningFees,
      amountPaid,
      serviceFees,
      checkInDate,
      checkOutDate,
    };

    const newReserve = await Reserve.create(data);
    res.status(201).json({ newReserve });
  } catch (err) {
    next(err);
  }
};
