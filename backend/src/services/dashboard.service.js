const { Op } = require("sequelize");

const User = require("../models/User");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

// ===============================
// OWNER DASHBOARD
// ===============================

const ownerDashboard = async (ownerId) => {

    const totalHotels = await Hotel.count({
        where: { ownerId },
    });

    const hotelIds = await Hotel.findAll({
        where: { ownerId },
        attributes: ["id"],
    });

    const ids = hotelIds.map(h => h.id);

    const totalRooms = await Room.count({
        where: {
            hotelId: {
                [Op.in]: ids,
            },
        },
    });

    const roomIds = await Room.findAll({
        where: {
            hotelId: {
                [Op.in]: ids,
            },
        },
        attributes: ["id"],
    });

    const roomIdArray = roomIds.map(r => r.id);

    const totalBookings = await Booking.count({
        where: {
            roomId: {
                [Op.in]: roomIdArray,
            },
        },
    });

    const pendingBookings = await Booking.count({
        where: {
            roomId: {
                [Op.in]: roomIdArray,
            },
            status: "PENDING",
        },
    });

    const confirmedBookings = await Booking.count({
        where: {
            roomId: {
                [Op.in]: roomIdArray,
            },
            status: "CONFIRMED",
        },
    });

    const cancelledBookings = await Booking.count({
        where: {
            roomId: {
                [Op.in]: roomIdArray,
            },
            status: "CANCELLED",
        },
    });

    const confirmed = await Booking.findAll({
        where: {
            roomId: {
                [Op.in]: roomIdArray,
            },
            status: "CONFIRMED",
        },
        attributes: ["totalPrice"],
    });

    const estimatedRevenue = confirmed.reduce(
        (sum, booking) => sum + Number(booking.totalPrice),
        0
    );

    return {
        totalHotels,
        totalRooms,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        estimatedRevenue,
    };
};


// ===============================
// ADMIN DASHBOARD
// ===============================

const adminDashboard = async () => {

    const totalUsers = await User.count();

    const owners = await User.count({
        where: {
            role: "OWNER",
        },
    });

    const customers = await User.count({
        where: {
            role: "CUSTOMER",
        },
    });

    const totalHotels = await Hotel.count();

    const pendingHotels = await Hotel.count({
        where: {
            status: "PENDING",
        },
    });

    const approvedHotels = await Hotel.count({
        where: {
            status: "APPROVED",
        },
    });

    const rejectedHotels = await Hotel.count({
        where: {
            status: "REJECTED",
        },
    });

    const totalBookings = await Booking.count();

    return {
        totalUsers,
        owners,
        customers,
        totalHotels,
        pendingHotels,
        approvedHotels,
        rejectedHotels,
        totalBookings,
    };
};

module.exports = {
    ownerDashboard,
    adminDashboard,
};