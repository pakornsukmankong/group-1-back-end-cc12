module.exports = (sequelize, DataTypes) => {
	const Booking = sequelize.define(
		'Booking',
		{
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
			amountPaid: {
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
		},
		{ underscored: true }
	);

	Booking.associate = (db) => {
		Booking.hasOne(db.PropertyReview, {
			foreignKey: {
				name: 'bookingId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Booking.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Booking.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Booking.belongsTo(db.Transaction, {
			foreignKey: {
				name: 'bookingId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Booking;
};
