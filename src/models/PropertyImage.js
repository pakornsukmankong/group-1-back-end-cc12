module.exports = (sequelize, DataTypes) => {
	const PropertyImage = sequelize.define(
		'PropertyImage',
		{
			propertyImage: DataTypes.STRING,
		},
		{ underscored: true }
	);

	PropertyImage.associate = (db) => {
		PropertyImage.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return PropertyImage;
};
