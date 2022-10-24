module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      categoryIconImage: DataTypes.STRING
    },
    { underscored: true }
  );

  Category.associate = (db) => {
    Category.hasMany(db.Property, {
      foreignKey: {
        name: 'categoryId',
        allowNull: true
      },
      onDelete: 'RESTRICT'
    });
  };

  return Category;
};
