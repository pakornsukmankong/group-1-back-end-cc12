module.exports = (sequelize, DataTypes) => {
	const PropertyReview = sequelize.define(
		'PropertyReview',
		{
			comment: DataTypes.STRING,
		},
		{ underscored: true }
	);

	PropertyReview.associate = (db) => {
		PropertyReview.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});

		PropertyReview.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});

		PropertyReview.belongsTo(db.Booking, {
			foreignKey: {
				name: 'bookingId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};

	return PropertyReview;
};
