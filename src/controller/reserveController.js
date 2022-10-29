const {
  Reserve,
  Property,
  PropertyImage,
  User,
  Booking,
} = require('../models');
const AppError = require('../utils/appError');

exports.createReserve = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const {
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

    const findAllBooking = await Booking.findAll({where: {checkInDate: new Date(data.checkInDate)}})

    findAllBooking.map((item) => {
      const checkDate = new Date(data.checkInDate).getTime()
      const startDate = new Date(item.checkInDate).getTime()
      const endDate = new Date(item.checkOutDate).getTime()

      // console.log("\n\n\n checkDate" , checkDate);
      // console.log("\n\n\n startDate" , startDate);
      // console.log("\n\n\n endDate" , endDate);

      if (checkDate >= startDate && checkDate <= endDate){
        throw new AppError('this date already booking',400)
      }
    })
    
    const newReserve = await Reserve.create(data);
    res.status(201).json({ newReserve , findAllBooking });
  } catch (err) {
    next(err);
  }
};

exports.getReserveRoom = async (req, res, next) => {
  const { reserveId } = req.params;

  try {
    const reservedRoom = await Reserve.findOne({
      where: { id: reserveId },
      include: [
        {
          model: Property,

          include: { model: PropertyImage, attributes: ['propertyImage'] },
        },
        {
          model: User,
          attributes: { exclude: 'password' },
        },
      ],
    });
    console.log(reservedRoom);

    res.status(201).json({ room: reservedRoom });
  } catch (err) {
    next(err);
  }
};

exports.deleteReserve = async (req, res, next) => {
  const { reserveId } = req.body;
  try {
    await Reserve.destroy({
      where: {
        id: reserveId,
      },
    });
    return res.status(200).json(req.omise);
  } catch (err) {
    next(err);
  }
};

exports.getStatusBookingByPropertyId = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const propertyBooking = await Booking.findAll({
      where: { propertyId },
      attributes: { exclude: 'paymentInfo' },
      order: [['checkOutDate', 'DESC']],
    });
    const recentPropertyBooking = propertyBooking[0];
    res.status(200).json({ recentPropertyBooking });
  } catch (err) {
    next(err);
  }
};
