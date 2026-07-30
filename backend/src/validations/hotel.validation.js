const Joi = require("joi");

const hotelSchema = Joi.object({

    hotelName: Joi.string()
        .min(3)
        .max(150)
        .required(),

    address: Joi.string()
        .required(),

    city: Joi.string()
        .required(),

    rating: Joi.number()
        .min(1)
        .max(5)
        .required(),

    availability: Joi.boolean()
        .required(),

    roomsAvailable: Joi.number()
        .integer()
        .min(1)
        .required(),

    employees: Joi.number()
        .integer()
        .min(0)
        .required(),

    floors: Joi.number()
        .integer()
        .min(1)
        .required(),

    food: Joi.boolean()
        .required(),

    safetyInstruments: Joi.boolean()
        .required(),

});
module.exports = hotelSchema;