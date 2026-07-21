const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    role: {
        type: DataTypes.ENUM('Admin', 'Owner', 'Customer'),
        allowNull: false,
        defaultValue: 'Customer',
    },

    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },


},
    {
        timestamps: true,
    }
);


module.exports = User;