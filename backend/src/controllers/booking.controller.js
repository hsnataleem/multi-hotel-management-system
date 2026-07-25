const {
    createBooking,
    getBookingById,
    getMyBookings,
    cancelBooking,
    getOwnerBookings,
    updateBookingStatus,
} = require("../services/booking.service");


// ====================================
// Create Booking
// ====================================

const create = async (req, res) => {

    try {

        const booking = await createBooking(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Booking request submitted successfully.",
            data: booking,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


// ====================================
// Get Booking By ID
// ====================================

const getBooking = async (req, res) => {

    try {

        const booking = await getBookingById(
            req.params.bookingId
        );

        res.status(200).json({
            success: true,
            data: booking,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};


// ====================================
// Customer Booking History
// ====================================

const myBookings = async (req, res) => {

    try {

        const bookings = await getMyBookings(
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: bookings,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


// ====================================
// Cancel Booking
// ====================================

const cancel = async (req, res) => {

    try {

        const booking = await cancelBooking(
            req.params.bookingId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully.",
            data: booking,
        });

    } catch (error) {

        if (error.message === "Forbidden") {

            return res.status(403).json({
                success: false,
                message: "You are not allowed to cancel this booking.",
            });

        }

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


// ====================================
// Owner Dashboard Bookings
// ====================================

const ownerBookings = async (req, res) => {

    try {

        const bookings = await getOwnerBookings(
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: bookings,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


// ====================================
// Update Booking Status
// ====================================

const updateStatus = async (req, res) => {

    try {

        const booking = await updateBookingStatus(
            req.params.bookingId,
            req.body.status,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Booking status updated successfully.",
            data: booking,
        });

    } catch (error) {

        if (error.message === "Forbidden") {

            return res.status(403).json({
                success: false,
                message: "You are not authorized.",
            });

        }

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


module.exports = {

    create,
    getBooking,
    myBookings,
    cancel,
    ownerBookings,
    updateStatus,

};