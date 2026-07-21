const bcrypt = require('bcrypt');
const User = require('../models/user');

const registerUser = async (userData) => {
    const {
        fullName,
        email,
        password,
        phoneNumber,
        role,
    } = userData;

    //check if email already exists
    const existingUser = await User.findOne ({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Errors('Email already registered.');
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        role,
    });
    return user;
};

module.exports = { registerUser };