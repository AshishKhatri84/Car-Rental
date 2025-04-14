import React, { useState, useEffect } from 'react'; 
import './Vehicles.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', price: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  // Simulated fetch from local storage (optional)
  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (storedVehicles && storedVehicles.length > 0) {
      setVehicles(storedVehicles);
    } else {
      const demoVehicles = [
        {
          _id: '1',
          name: 'Tesla Model 3',
          type: 'Electric',
          price: '$90/day',
          image: 'https://preview.thenewsmarket.com/Previews/NCAP/StillAssets/1920x1080/684698_v3.jpg',
        },
        {
          _id: '2',
          name: 'Ford Mustang',
          type: 'Convertible',
          price: '$120/day',
          image: 'https://www.vdm.ford.com/content/dam/na/ford/en_us/images/mustang/2025/jellybeans/Ford_Mustang_2025_700A_PG1_88A_89A_13K_COU_64R_67J_990_19X_18Z_91A_17P_44E_MAC_YZTAC_DEFAULT_EXT_4.png',
        },
        {
          _id: '3',
          name: 'Toyota Innova',
          type: 'SUV',
          price: '$70/day',
          image: 'https://www.financialexpress.com/wp-content/uploads/2021/07/toyota-Innova-crysta-2021.jpg',
        },
      ];
      setVehicles(demoVehicles);
      saveToLocalStorage(demoVehicles);
    }
  }, []);
  
    const saveToLocalStorage = (data) => {
      localStorage.setItem('vehicles', JSON.stringify(data));
    };
  
    const addVehicle = () => {
      const newVehicle = {
        ...formData,
        _id: Date.now().toString()
      };
      const updatedVehicles = [...vehicles, newVehicle];
      setVehicles(updatedVehicles);
      saveToLocalStorage(updatedVehicles);
      setFormData({ name: '', type: '', price: '', image: '' });
    };
  
    const updateVehicle = () => {
      const updatedVehicles = vehicles.map((v) =>
        v._id === editingId ? { ...v, ...formData } : v
      );
      setVehicles(updatedVehicles);
      saveToLocalStorage(updatedVehicles);
      setFormData({ name: '', type: '', price: '', image: '' });
      setEditingId(null);
    };
  
    const deleteVehicle = (id) => {
      const updatedVehicles = vehicles.filter((v) => v._id !== id);
      setVehicles(updatedVehicles);
      saveToLocalStorage(updatedVehicles);
    };
  
    const startEdit = (vehicle) => {
      setEditingId(vehicle._id);
      setFormData({
        name: vehicle.name,
        type: vehicle.type,
        price: vehicle.price,
        image: vehicle.image
      });
    };
  
    return (
      <div className="vehicles-wrapper">
        <h2>Manage Vehicle</h2>
        <div className="vehicle-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price (e.g. 100)"
            value={formData.price}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, price: value });
              }
            }}
          />
  
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <button className="btn-primary" onClick={editingId ? updateVehicle : addVehicle}>
            {editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
          {editingId && (
            <button
              className="btn-primary"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', type: '', price: '', image: '' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
  
        <div className="vehicle-table">
          {vehicles.length === 0 ? (
            <p>No vehicles available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id}>
                    <td><img src={vehicle.image} alt={vehicle.name} width="100" /></td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.price}</td>
                    <td>
                      <button className="btn-primary" onClick={() => startEdit(vehicle)}>Edit</button>
                      <button className="btn-danger" onClick={() => deleteVehicle(vehicle._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };
  
  export default Vehicles;