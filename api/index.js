// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const app = express();

dotenv.config();

app.use(express.json());  // Middleware to parse JSON requests
app.use(cors());  // Allow cross-origin requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
const vehicleRoutes = require('./routes/vehicle');
app.use('/api/vehicles', vehicleRoutes);  // This sets the base route for vehicle-related API

app.get('/', (req, res) => {
  res.send('API is working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));