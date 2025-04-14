const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  userName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
