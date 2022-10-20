const express = require('express');
const router = express.Router();

require('dotenv').config();

let omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

router.post('/', async (req, res, next) => {
  const { email, name, amount, token } = req.body;
  console.log(req.body);
  try {
    const customer = await omise.customers.create({
      email,
      description: name,
      card: token,
    });

    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      customer: customer.id,
    });

    // console.log('Charge -->', charge);
    return res.status(200).json({ amount: charge, status: charge.status });
  } catch (err) {
    console.log(err);
  }

  next();
});

module.exports = router;
