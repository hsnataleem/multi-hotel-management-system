const Joi = require("joi");

const roomSchema = Joi.object({

    roomNumber: Joi.string()
        .required(),

    roomType: Joi.string()
        .valid(
            "Single",
            "Double",
            "Deluxe",
            "Suite",
            "Family"
        )
        .required(),

    pricePerNight: Joi.number()
        .positive()
        .required(),

    capacity: Joi.number()
        .integer()
        .min(1)
        .required(),

    foodService: Joi.boolean()
        .required(),

    smokingAllowed: Joi.boolean()
        .required(),

});

module.exports = roomSchema;