const { Reserve, Property, PropertyImage } = require('../models')

exports.createReserve = async (req, res, next) => {
  try {
    const propertyId = req.params.propertyId
    const {
      pricePerDate,
      guestsCount,
      cleaningFees,
      amountPaid,
      serviceFees,
      checkInDate,
      checkOutDate,
    } = req.body

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
    }

    const newReserve = await Reserve.create(data)
    res.status(201).json({ newReserve })
  } catch (err) {
    next(err)
  }
}

exports.getReserveRoom = async (req, res, next) => {
  try {
    const { userId } = req.body
    console.log(userId)
    // const userId = req.user.id // from authenticate
    const reservedRoom = await Reserve.findOne({
      where: { userId },
      include: [
        {
          model: Property,
          attributes: ['propertyName'],
          include: { model: PropertyImage, attributes: ['propertyImage']},
        },
      ],
    })
    console.log(reservedRoom)

    res.status(201).json({ room: reservedRoom })
  } catch (err) {
    next(err)
  }
}
