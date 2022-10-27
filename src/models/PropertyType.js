module.exports = (sequelize, DataTypes) => {
  const PropertyType = sequelize.define(
    'PropertyType',
    {
      propertyTypeName: DataTypes.STRING,
      propertyTypeIconImage: DataTypes.STRING
    },
    { underscored: true }
  );

  PropertyType.associate = (db) => {
    PropertyType.hasMany(db.Property, {
      foreignKey: {
        name: 'propertyTypeId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });
  };

  return PropertyType;
};
