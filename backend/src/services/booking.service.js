const { Op } = require("sequelize");

const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const User = require("../models/User");


// =============================
// Create Booking
// =============================

const createBooking = async (bookingData, customerId) => {

    const {
        roomId,
        checkInDate,
        checkOutDate,
        totalGuests,
        specialRequest,
    } = bookingData;

    // Validate dates
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
        throw new Error("Check-out date must be after check-in date.");
    }

    // Find room
    const room = await Room.findByPk(roomId);

    if (!room) {
        throw new Error("Room not found.");
    }

    // Check room availability
    if (!room.isAvailable) {
        throw new Error("Room is currently unavailable.");
    }

    // Capacity validation
    if (totalGuests > room.capacity) {
        throw new Error(
            `Maximum ${room.capacity} guests allowed.`
        );
    }

    // Check overlapping confirmed bookings
    const existingBooking = await Booking.findOne({

        where: {

            roomId,

            status: "CONFIRMED",

            checkInDate: {
                [Op.lt]: checkOutDate,
            },

            checkOutDate: {
                [Op.gt]: checkInDate,
            },

        },

    });

    if (existingBooking) {
        throw new Error(
            "Room is already booked for selected dates."
        );
    }

    // Calculate total nights
    const nights = Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate))
        / (1000 * 60 * 60 * 24)
    );

    // Calculate total price
    const totalPrice = nights * Number(room.pricePerNight);

    // Create booking
    const booking = await Booking.create({

        customerId,
        roomId,
        checkInDate,
        checkOutDate,
        totalGuests,
        totalPrice,
        specialRequest,
        status: "PENDING",

    });

    return booking;
};



// =============================
// Get Booking By ID
// =============================

const getBookingById = async (bookingId) => {

    const booking = await Booking.findByPk(bookingId, {

        include: [
            {
                model: Room,
            },
            {
                model: User,
                attributes: ["id", "fullName", "email"],
            },
        ],

    });

    if (!booking) {
        throw new Error("Booking not found.");
    }

    return booking;
};



// =============================
// Customer Booking History
// =============================

const getMyBookings = async (customerId) => {

    return await Booking.findAll({

        where: {
            customerId,
        },

        include: [
            {
                model: Room,
            },
        ],

        order: [["createdAt", "DESC"]],

    });

};



// =============================
// Cancel Booking
// =============================

const cancelBooking = async (bookingId, customerId) => {

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        throw new Error("Booking not found.");
    }

    if (booking.customerId !== customerId) {
        throw new Error("Forbidden");
    }

    if (booking.status === "CONFIRMED") {
        throw new Error(
            "Confirmed booking cannot be cancelled."
        );
    }

    booking.status = "CANCELLED";

    await booking.save();

    return booking;
};



// =============================
// Owner Dashboard Bookings
// =============================

const getOwnerBookings = async (ownerId) => {

    return await Booking.findAll({

        include: [

            {
                model: Room,

                include: [

                    {
                        model: Hotel,

                        where: {
                            ownerId,
                        },
                    },

                ],

            },

            {
                model: User,
                attributes: [
                    "id",
                    "fullName",
                    "email",
                ],
            },

        ],

        order: [["createdAt", "DESC"]],

    });

};



// =============================
// Update Booking Status
// =============================

const updateBookingStatus = async (
    bookingId,
    status,
    ownerId
) => {

    const booking = await Booking.findByPk(bookingId, {

        include: [

            {
                model: Room,

                include: [

                    {
                        model: Hotel,
                    },

                ],

            },

        ],

    });

    if (!booking) {
        throw new Error("Booking not found.");
    }

    if (booking.Room.Hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    if (
        status !== "CONFIRMED" &&
        status !== "REJECTED"
    ) {
        throw new Error("Invalid booking status.");
    }

    booking.status = status;

    await booking.save();

    return booking;
};



module.exports = {

    createBooking,

    getBookingById,

    getMyBookings,

    cancelBooking,

    getOwnerBookings,

    updateBookingStatus,

};