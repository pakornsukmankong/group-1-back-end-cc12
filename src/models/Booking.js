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
			paymentInfo: {
				// instead of transaction model
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
			onDelete: 'CASCADE',
		});

		Booking.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});

		Booking.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};

	return Booking;
};
