const { User } = require('../models');

User.sync({ force: true })
	.then(() => process.exit(0))
	.catch((err) => process.exit(1));
