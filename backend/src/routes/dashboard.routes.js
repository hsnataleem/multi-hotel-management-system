const express = require("express");

const router = express.Router();

const {
    ownerStats,
    adminStats,
} = require("../controllers/dashboard.controller");

const { protect } = require("../middlewares/auth.middleware");

const { authorize } = require("../middlewares/role.middleware");

router.get(
    "/owner",
    protect,
    authorize("Owner"),
    ownerStats
);

router.get(
    "/admin",
    protect,
    authorize("ADMIN"),
    adminStats
);

module.exports = router;