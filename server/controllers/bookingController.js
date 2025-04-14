const Booking = require('../models/bookingModel');
const Vehicle = require('../models/vehicleModel');

// Fetch all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('vehicleId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
    try {
      const { vehicleId, userName, bookingDate } = req.body;
      const vehicle = await Vehicle.findById(vehicleId);
  
      if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle not found' });
      }
  
      const booking = new Booking({ vehicleId, userName, bookingDate });
      await booking.save();
  
      console.log('New booking created:', booking); // Log to check if booking is created
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create booking', error });
    }
  };
  
module.exports = { getBookings, createBooking };