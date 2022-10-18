module.exports = (sequelize, DataTypes) => {
	const Subdistrict = sequelize.define(
		'Subdistrict',
		{
			subdistrictName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	Subdistrict.associate = (db) => {
		Subdistrict.hasMany(db.Property, {
			foreignKey: {
				name: 'subdistrictId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Subdistrict.belongsTo(db.District, {
			foreignKey: {
				name: 'districtId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};
	return Subdistrict;
};
