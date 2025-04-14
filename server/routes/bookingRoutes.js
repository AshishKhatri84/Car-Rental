const express = require('express');
const router = express.Router();
const { getBookings, createBooking } = require('../controllers/bookingController');

router.get('/bookings', getBookings);  // Fetch all bookings
router.post('/bookings', createBooking); // Create a new booking

module.exports = router;
