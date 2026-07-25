const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Hotel = sequelize.define(
  "Hotel",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    hotelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    roomsAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    employees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    food: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    safetyInstruments: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Hotel;