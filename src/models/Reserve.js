module.exports = (sequelize, DataTypes) => {
	const Reserve = sequelize.define(
		'Reserve',
		{
			pricePerDate: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			guestsCount: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},

			amountPaid: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			checkInDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			checkOutDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	Reserve.associate = (db) => {
		Reserve.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Reserve.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};

	return Reserve;
};
