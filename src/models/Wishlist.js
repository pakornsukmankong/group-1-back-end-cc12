module.exports = (sequelize, DataTypes) => {
	const Wishlist = sequelize.define('Wishlist', {}, { underscored: true });

	Wishlist.associate = (db) => {
		Wishlist.belongsTo(db.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});

		Wishlist.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'CASCADE',
		});
	};

	return Wishlist;
};
