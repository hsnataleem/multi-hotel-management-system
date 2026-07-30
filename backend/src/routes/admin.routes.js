const express = require('express');
const router = express.Router();

const { pendingHotels, approve, reject, allBookings} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

//every admin route require authentication

router.use(protect);
router.use(authorize("ADMIN"));

//Hotels
router.get("/hotels/pending", pendingHotels);
router.patch("/hotels/:id/approve", approve);
router.patch("/hotels/:id/reject", reject);
router.get("/bookings", allBookings);


module.exports = router;