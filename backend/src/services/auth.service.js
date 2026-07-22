const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

// Login user functionality
const loginUser = async ({ email, password }) => {
    //find user by email
    const user = await User.findOne ({
        where: {
            email
        },
    });
    //error if user not found
    if(!user) {
        throw new Error('Invalid email or password.');
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }

    //Generate json web token

    const token = jwt.sign({
        id: user.id,
        role: user.role,
    },

    process.env.JWT_SECRET, {
        expiresIn: '1d',
    }
);

// remove password before sending user data in response
const userData = user.toJSON();
delete userData.password;

return { user: userData, token };
};

module.exports = { registerUser, loginUser };