// const { sequelize } = require('./models');

// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');
const authRoute = require('./route/authRoute');

var omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

// const createCharge = async () => {
//   const customer = await omise.customers.create({
//     email: 'john.doe@example.com',
//     description: 'John Doe (id: 30)',
//     card: 'tokn_test_5tiq36h1gthnqzqza1z', //token.id,
//   });

//   const charge = await omise.charges.create({
//     amount: 2000,
//     currency: 'thb',
//     customer: customer.id,
//   });

//   console.log('Charge -->', charge);
// };

// createCharge()

app.post('/checkout-credit-card', async (req, res, next) => {
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

    console.log('Charge -->', charge);
    res.status(200).json({ amount: charge, status: charge.status });
  } catch (err) {
    console.log(err);
  }

  next();
});

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`server running at port ${port}\n\n\n\n\n`));
