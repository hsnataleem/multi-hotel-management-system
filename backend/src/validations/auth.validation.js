const Joi = require("joi");

const registerSchema = Joi.object({

    fullName: Joi.string()
        .min(3)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    phoneNumber: Joi.string()
        .pattern(/^[0-9]{11}$/)
        .required(),

    role: Joi.string()
        .valid("OWNER", "CUSTOMER", "ADMIN")
        .required(),

});

const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),

});

module.exports = {
    registerSchema,
    loginSchema,
};