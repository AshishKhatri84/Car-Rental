// server/controllers/carController.js
const Car = require('../models/Vehicle');

// Add a new car
const addCar = async (req, res) => {
  const { make, model, year, pricePerDay } = req.body;
  try {
    const newCar = new Car({ make, model, year, pricePerDay });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addCar, getCars };
