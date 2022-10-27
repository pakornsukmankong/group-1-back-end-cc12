module.exports = (sequelize, DataTypes) => {
  const PropertyCategory = sequelize.define(
    'PropertyCategory',
    {},
    { underscored: true }
  );

  PropertyCategory.associate = (db) => {
    PropertyCategory.belongsTo(db.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    PropertyCategory.belongsTo(db.Property, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return PropertyCategory;
};
