const { Province } = require('../models');

Province.sync({ force: true })
	.then(() => process.exit(0))
	.catch((err) => process.exit(1));
