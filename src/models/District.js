module.exports = (sequelize, DataTypes) => {
	const District = sequelize.define(
		'District',
		{
			districtName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	District.associate = (db) => {
		District.hasMany(db.Subdistrict, {
			foreignKey: {
				name: 'districtId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		District.hasMany(db.Property, {
			foreignKey: {
				name: 'districtId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		District.belongsTo(db.Province, {
			foreignKey: {
				name: 'provinceId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return District;
};
