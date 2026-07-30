const Joi = require("joi");

const bookingSchema = Joi.object({

    roomId: Joi.string()
        .uuid()
        .required(),

    checkInDate: Joi.date()
        .required(),

    checkOutDate: Joi.date()
        .greater(Joi.ref("checkInDate"))
        .required(),

});

module.exports = bookingSchema;