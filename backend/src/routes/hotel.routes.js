const express = require("express");
const router = express.Router();
const { addHotel, getHotels, getHotel, updateHotelController, deleteHotelController, myHotels } = require("../controllers/hotel.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const roomRoutes = require('./room.routes');


router.get("/", getHotels);

router.get(
    "/my-hotels",
    protect,
    authorize("OWNER"),
    myHotels
);

router.use("/:hotelId/rooms", roomRoutes);

router.get("/:id", getHotel);

router.put("/:id", protect, authorize("OWNER"), updateHotelController);

router.delete("/:id", protect, authorize("OWNER"), deleteHotelController);

router.post(
    "/",
    protect,
    authorize("Owner"),
    addHotel
);

module.exports = router;