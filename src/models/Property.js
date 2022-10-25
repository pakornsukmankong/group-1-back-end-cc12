const {
  HOST_ACTIVE,
  HOST_DELETED,
  HOST_PENDING
} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    'Property',
    {
      propertyName: {
        type: DataTypes.STRING,
        unique: true
      },
      description: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      bedQty: DataTypes.INTEGER,
      bedRoomQty: DataTypes.INTEGER,
      bathRoomQty: DataTypes.INTEGER,
      pricePerDate: DataTypes.INTEGER,
      hostStatus: {
        type: DataTypes.ENUM(HOST_ACTIVE, HOST_PENDING, HOST_DELETED),
        allowNull: false,
        defaultValue: HOST_PENDING
      },
      serviceFees: {
        type: DataTypes.STRING,
        defaultValue: '400',
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      cleaningFees: {
        type: DataTypes.STRING,
        defaultValue: '450',
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Property.associate = (db) => {
    Property.hasMany(db.Reserve, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Property.hasMany(db.Booking, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Property.hasOne(db.PropertyReview, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Property.hasMany(db.PropertyFacility, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Property.hasMany(db.PropertyImage, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Property.belongsTo(db.User, {
      foreignKey: {
        name: 'userHostId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Property.belongsTo(db.User, {
      foreignKey: {
        name: 'userHostId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Property.belongsTo(db.PropertyType, {
      foreignKey: {
        name: 'propertyTypeId',
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    Property.hasMany(db.Wishlist, {
      foreignKey: {
        name: 'propertyId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return Property;
};
