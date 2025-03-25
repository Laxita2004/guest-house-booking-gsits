const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require('./routes/payment');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/bookings", authMiddleware.verifyToken, bookingRoutes);
app.use("/admin", authMiddleware.verifyToken, adminRoutes);
app.use('api/payment', paymentRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("Guest House Booking API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
