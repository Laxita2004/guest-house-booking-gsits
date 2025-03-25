const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController").default;
const { getUserBookings } = require("../controllers/bookingController").default;
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.verifyToken, createBooking);
router.get("/user/:user_id", authMiddleware.verifyToken, getUserBookings); 
module.exports = router;
