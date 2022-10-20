module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		'Transaction',
		{
			paymentInfo: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	Transaction.associate = (db) => {
		Transaction.belongsTo(db.Booking, {
			foreignKey: {
				name: 'bookingId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Transaction;
};
