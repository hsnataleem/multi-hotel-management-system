const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addRoom,
    getRooms,
    getRoom,
    editRoom,
    removeRoom,
} = require("../controllers/room.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

// Public Routes
router.get("/", getRooms);
router.get("/:roomId", getRoom);

// Protected Routes
router.post(
    "/",
    protect,
    authorize("Owner"),
    addRoom
);

router.put(
    "/:roomId",
    protect,
    authorize("Owner"),
    editRoom
);

router.delete(
    "/:roomId",
    protect,
    authorize("Owner"),
    removeRoom
);

module.exports = router;
module.exports = router;