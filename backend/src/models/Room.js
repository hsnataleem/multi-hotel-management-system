const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Room = sequelize.define(
    "Room",
    {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        roomNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        roomType: {
            type: DataTypes.ENUM(
                "STANDARD",
                "DELUXE",
                "SUITE"
            ),
            allowNull: false,
        },

        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        pricePerNight: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
        },

        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

        bedType: {
            type: DataTypes.ENUM(
                "SINGLE",
                "DOUBLE",
                "KING",
                "QUEEN"
            ),
        },

        airConditioned: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

        wifi: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },

        foodService: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        smokingAllowed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        balcony: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        roomImages: {
            type: DataTypes.JSON,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = Room;