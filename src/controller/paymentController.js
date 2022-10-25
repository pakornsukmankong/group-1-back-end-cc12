const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
})

exports.createPayment = async (req, res, next) => {
  const { email, name, amount, token } = req.body
  // console.log(req.body)
  try {
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token,
    })

    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      customer: customer.id,
    })

    req.tokenOmise = token
    req.omise = { amount: charge, status: charge.status }
    next()
  } catch (err) {
    next(err)
  }
}
