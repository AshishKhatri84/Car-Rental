// models/Vehicle.js
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rentalPricePerDay: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
