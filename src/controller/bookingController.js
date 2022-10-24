const { Booking, Reserve } = require('../models')

exports.createBook = async (req, res, next) => {
  try {
    // const userId = req.user.id
    const reservedRoom = await Reserve.findOne({
      where: {
        // userId,
        userId: 4,
      },
      attributes: [
        'guestsCount',
        'checkInDate',
        'checkOutDate',
        'amountPaid',
        'propertyId',
      ],
    })
    console.log(reservedRoom)
    const { guestsCount, checkInDate, checkOutDate, amountPaid, propertyId } =
      reservedRoom
    const paymentInfo = req.tokenOmise
    const bookedRoom = await Booking.create({
      userId: 4, // userId: req.user.id
      propertyId,
      guestsCount,
      checkInDate,
      checkOutDate,
      amountPaid,
      paymentInfo,
    })
    console.log('\n\n booked rooom --> \n\n', bookedRoom)
    next()
  } catch (err) {
    next(err)
  }
}
