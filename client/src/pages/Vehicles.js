import React, { useState } from 'react';
import axios from 'axios';
import './Vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Tesla Model 3', type: 'Electric', price: '$90/day', image: "https://www.financialexpress.com/wp-content/uploads/2025/02/tesla-model-3-india.jpg" },
    { id: 2, name: 'Ford Mustang', type: 'Convertible', price: '$120/day', image: "https://build.ford.com/dig/Ford/Mustang/2024/HD-TILE/Image%5B%7CFord%7CMustang%7C2024%7C1%7C1.%7C400A...PJS..889.89W.13B.CON.64V.99F.52B.44X.GT.YZTAC.%5D/EXT/1/vehicle.png" },
    { id: 3, name: 'Toyota Innova', type: 'SUV', price: '$70/day', image: "https://static3.toyotabharat.com/images/showroom/innova-hycross/sparkling-black-pearl-crystal-shine.png" }
  ]);
  const [newVehicle, setNewVehicle] = useState({ name: '', model: '', price: '' });
  const [editVehicle, setEditVehicle] = useState(null);  // For storing the vehicle being edited

  // Add new vehicle
  const handleAddVehicle = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/vehicles',
        newVehicle,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Clear the form and refresh vehicle list on successful addition
      setNewVehicle({ name: '', model: '', price: '' });
      const vehicleResponse = await axios.get('http://localhost:5000/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(vehicleResponse.data);
    } catch (error) {
      // Log error response to understand what went wrong
      console.error("Error while adding vehicle:", error.response ? error.response.data : error.message);
      alert("Not Authorized to add vehicle. Please login as admin.");
    }
  };

  // Delete vehicle
  const handleDelete = async (vehicleId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/vehicles/${vehicleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Refresh vehicle list after deletion
    const response = await axios.get('http://localhost:5000/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles(response.data);
  };

  // Edit existing vehicle
  const handleEditVehicle = (vehicle) => {
    setEditVehicle(vehicle);
    setNewVehicle({ name: vehicle.name, model: vehicle.model, price: vehicle.price });  // Set values for editing
  };

  // Update existing vehicle
  const handleUpdateVehicle = async () => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:5000/api/vehicles/${editVehicle.id}`,
      newVehicle,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setEditVehicle(null); // Clear edit mode
    setNewVehicle({ name: '', model: '', price: '' }); // Clear input fields
    // Refresh vehicle list after updating
    const response = await axios.get('http://localhost:5000/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles(response.data);
  };

  return (
    <div className="vehicles-container">
      <h2>Manage Vehicles</h2>

      <div className="add-vehicle">
        <h3>{editVehicle ? 'Update Vehicle' : 'Add New Vehicle'}</h3>
        <input
          type="text"
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vehicle Model"
          value={newVehicle.model}
          onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newVehicle.price}
          onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
        />
        <button onClick={editVehicle ? handleUpdateVehicle : handleAddVehicle}>
          {editVehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </div>

      <h2>Available Vehicles</h2>

      <div className="vehicle-list">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-card">
            <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
            <h4>{vehicle.name}</h4>
            <p>Type: {vehicle.type}</p>
            <p>Price: {vehicle.price}</p>
            <button onClick={() => handleEditVehicle(vehicle)}>Edit</button>
            <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
