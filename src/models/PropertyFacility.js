module.exports = (sequelize, DataTypes) => {
	const PropertyFacility = sequelize.define(
		'PropertyFacility',
		{},
		{ underscored: true }
	);

	PropertyFacility.associate = (db) => {
		PropertyFacility.belongsTo(db.Facility, {
			foreignKey: {
				name: 'facilityId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		PropertyFacility.belongsTo(db.Property, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return PropertyFacility;
};
