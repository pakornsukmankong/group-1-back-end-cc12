module.exports = (sequelize, DataTypes) => {
	const Property = sequelize.define(
		'Property',
		{
			propertyName: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			description: DataTypes.STRING,
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			bedQty: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			bedRoomQty: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			bathRoomQty: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			pricePerDay: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			roomAvaliable: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ underscored: true }
	);

	Property.associate = (db) => {
		Property.hasMany(db.Reserve, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.hasMany(db.Booking, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.hasOne(db.PropertyReview, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.hasMany(db.PropertyFacility, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.hasMany(db.PropertyImage, {
			foreignKey: {
				name: 'propertyId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.belongsTo(db.User, {
			foreignKey: {
				name: 'userHostId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.belongsTo(db.PropertyType, {
			foreignKey: {
				name: 'propertyTypeId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.belongsTo(db.Province, {
			foreignKey: {
				name: 'provinceId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});

		Property.belongsTo(db.District, {
			foreignKey: {
				name: 'districtId',
				allowNull: false,
			},
			onDelete: 'RESTRICT',
		});
	};

	return Property;
};
