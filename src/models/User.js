module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			profileImage: DataTypes.STRING,
			phone: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			about: DataTypes.STRING,
			// <== Optional ===>

			// role: {
			// 	type: DataTypes.ENUM('User', 'Admin'),
			// 	defaultValue: 'User',
			// 	allowNull: false,
			// 	validate: {
			// 		isEmail: true,
			// 	},
			// },
		},
		{ underscored: true }
	);

	User.associate = (db) => {
		User.hasMany(db.Property, {
			foreignKey: {
				name: 'userHostId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasMany(db.Reserve, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});

		User.hasMany(db.Booking, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		User.hasOne(db.PropertyReview, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return User;
};
