module.exports = (sequelize, DataTypes) => {
	const Facility = sequelize.define(
		'Facility',
		{
			facilityName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			facilityIconImage: DataTypes.STRING,
		},
		{ underscored: true }
	);

	Facility.associate = (db) => {
		Facility.hasMany(db.PropertyFacility, {
			foreignKey: {
				name: 'facilityId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Facility;
};
