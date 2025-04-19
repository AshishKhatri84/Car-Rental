const express = require('express');
const Vehicle = require('../models/Vehicle'); // Assuming you have a Vehicle model.
const authMiddleware = require('../middleware/auth'); // This is where we import the auth middleware.
const router = express.Router();

// POST: Create a new vehicle
router.post('/', authMiddleware, async (req, res) => {
  const { make, model, year, price } = req.body;

  // Check if all required fields are present
  if (!make || !model || !year || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create the vehicle
    const newVehicle = new Vehicle({ make, model, year, price });
    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', vehicle: newVehicle });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a vehicle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, brand, year, rentalPricePerDay, isAvailable } = req.body;

  try {
    const vehicle = await Vehicle.findByIdAndUpdate(id, { name, brand, year, rentalPricePerDay, isAvailable }, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a vehicle
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
