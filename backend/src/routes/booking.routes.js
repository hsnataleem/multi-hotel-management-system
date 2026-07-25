const express = require("express");

const router = express.Router();

const {

    create,
    getBooking,
    myBookings,
    cancel,
    ownerBookings,
    updateStatus,

} = require("../controllers/booking.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// =======================================
// Customer Routes
// =======================================

// Create Booking
router.post(
    "/",
    protect,
    authorize("Customer"),
    create
);

// Booking History
router.get(
    "/my-bookings",
    protect,
    authorize("Customer"),
    myBookings
);

// Cancel Booking
router.patch(
    "/:bookingId/cancel",
    protect,
    authorize("Customer"),
    cancel
);


// =======================================
// Owner Routes
// =======================================

// Owner Dashboard
router.get(
    "/owner",
    protect,
    authorize("Owner"),
    ownerBookings
);

// Approve / Reject Booking
router.patch(
    "/:bookingId/status",
    protect,
    authorize("Owner"),
    updateStatus
);


// =======================================
// Common Route
// =======================================

router.get(
    "/:bookingId",
    protect,
    getBooking
);


module.exports = router;