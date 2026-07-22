const { registerUser , loginUser } = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login controller Flow

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const {token, user} = await loginUser({email, password});

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            data: user,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { register, login };