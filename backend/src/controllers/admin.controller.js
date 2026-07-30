const { getPendingHotels, approveHotel, rejectHotel, getAllBookings } = require("../services/admin.service");

const pendingHotels = async (req, res) => {
    try {
        const hotels = await getPendingHotels();

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const approve = async (req, res) => {
    try {
        const hotel = await approveHotel(req.params.id);

        res.status(200).json({
            success: true,
            message: "Hotel approved successfully.",
            data: hotel,
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const reject = async (req, res) => {

    try {

        const hotel = await rejectHotel(req.params.id);

        res.status(200).json({
            success: true,
            message: "Hotel rejected successfully.",
            data: hotel,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }

};

const allBookings = async (req, res) => {

    try {

        const bookings = await getAllBookings();

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    pendingHotels,
    approve,
    reject,
    allBookings,
};
