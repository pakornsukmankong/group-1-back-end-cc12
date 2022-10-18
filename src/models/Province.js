module.exports = (sequelize, DataTypes) => {
	const Province = sequelize.define(
		'Province',
		{
			provinceName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	Province.associate = (db) => {
		Province.hasMany(db.District, {
			foreignKey: {
				name: 'provinceId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Province;
};
