const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Booking = sequelize.define("Booking", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    totalGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    totalPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM(
            "PENDING",
            "CONFIRMED",
            "REJECTED",
            "CANCELLED"
        ),
        defaultValue: "PENDING",
    },

    specialRequest: {
        type: DataTypes.TEXT,
    }

}, {
    timestamps: true,
});

module.exports = Booking;