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

const validate = require("../middlewares/validate.middleware");
const bookingSchema = require("../validations/booking.validation");

router.post(
    "/",
    protect,
    authorize("CUSTOMER"),
    validate(bookingSchema),
    create
);

router.get(
    "/my-bookings",
    protect,
    authorize("CUSTOMER"),
    myBookings
);

router.patch(
    "/:bookingId/cancel",
    protect,
    authorize("CUSTOMER"),
    cancel
);

router.get(
    "/owner",
    protect,
    authorize("OWNER"),
    ownerBookings
);

router.patch(
    "/:bookingId/status",
    protect,
    authorize("OWNER"),
    updateStatus
);

router.get(
    "/:bookingId",
    protect,
    getBooking
);

module.exports = router;