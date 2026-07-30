const Hotel = require("../models/Hotel");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Get all pending hotels
const getPendingHotels = async () => {

    const hotels = await Hotel.findAll({

        where: {
            status: "PENDING",
        },

        include: [
            {
                model: User,

                attributes: [
                    "id",
                    "fullName",
                    "email",
                    "phoneNumber",
                ],
            },
        ],

        order: [
            ["createdAt", "DESC"],
        ],

    });

    return hotels;
};

const approveHotel = async (hotelId) => {

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    hotel.status = "APPROVED";

    await hotel.save();

    return hotel;
};

const rejectHotel = async (hotelId) => {

    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    hotel.status = "REJECTED";

    await hotel.save();

    return hotel;
};


const getAllBookings = async () => {

    const bookings = await Booking.findAll({

        include: [

            {
                model: Room,

                attributes: [
                    "roomNumber",
                    "roomType",
                    "pricePerNight",
                ],

                include: [
                    {
                        model: Hotel,

                        attributes: [
                            "hotelName",
                            "city",
                        ],
                    },
                ],
            },

            {
                model: User,

                attributes: [
                    "fullName",
                    "email",
                ],
            },

        ],

        order: [
            ["createdAt", "DESC"],
        ],

    });

    return bookings;
};

module.exports = {
    getPendingHotels,
    approveHotel,
    rejectHotel,
    getAllBookings,
};