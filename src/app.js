// const { sequelize } = require('./models');

// sequelize.sync();

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');
const authRoute = require('./route/authRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`server running at port ${port}\n\n\n\n\n`));
