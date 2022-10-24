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
		Transaction.hasOne(db.Booking, {
			foreignKey: {
				name: 'transactionId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Transaction;
};
