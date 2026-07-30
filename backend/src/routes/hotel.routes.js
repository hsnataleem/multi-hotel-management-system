const express = require("express");
const router = express.Router();
const { addHotel, getHotels, getHotel, updateHotelController, deleteHotelController, myHotels, search } = require("../controllers/hotel.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const roomRoutes = require('./room.routes');
const upload = require("../middlewares/upload.middleware");
const validate = require("../middlewares/validate.middleware");
const hotelSchema = require("../validations/hotel.validation")

router.get("/", getHotels);
router.get("/search", search);

router.get(
    "/my-hotels",
    protect,
    authorize("Owner"),
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
    upload.single("coverImage"),
    validate(hotelSchema),
    addHotel
);

module.exports = router;