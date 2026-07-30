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

const validate = require("../middlewares/validate.middleware");
const roomSchema = require("../validations/room.validation");

router.get("/", getRooms);

router.get("/:roomId", getRoom);

router.post(
    "/",
    protect,
    authorize("OWNER"),
    validate(roomSchema),
    addRoom
);

router.put(
    "/:roomId",
    protect,
    authorize("OWNER"),
    editRoom
);

router.delete(
    "/:roomId",
    protect,
    authorize("OWNER"),
    removeRoom
);

module.exports = router;