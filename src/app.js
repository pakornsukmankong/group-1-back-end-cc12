// const { sequelize } = require('./models');

// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');
const authRoute = require('./route/authRoute');
const reserveRoute = require('./route/reserveRoute');
const paymentRoute = require('./route/paymentRoute');
const propertyTypeRoute = require('./route/propertyTypeRoute');
const facilityRoute = require('./route/facilityRoute');
const categoryRoute = require('./route/categoryRoute');

const hostRoute = require('./route/hostRoute');
let omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/host', hostRoute);

app.use('/reserve', reserveRoute);
// app.use('/reserve', authenticate, reserveRoute);
app.use('/payment', paymentRoute);
// app.use('/payment', authenticate, paymentRoute);

app.use('/property-type', propertyTypeRoute);
app.use('/facility', facilityRoute);
app.use('/category', categoryRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`server running at port ${port}\n\n\n\n\n`));
