import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookings.css';

const BookingsPage = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Tesla Model 3', type: 'Electric', price: '$90/day' },
    { id: 2, name: 'Ford Mustang', type: 'Convertible', price: '$120/day' },
    { id: 3, name: 'Toyota Innova', type: 'SUV', price: '$70/day' },
  ]);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    vehicleId: '',
    userName: '',
    bookingDate: '',
  });

  // Fetch current bookings from the backend
  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the bookings:', error);
      });
  };

  useEffect(() => {
    fetchBookings(); // Fetch bookings on initial load
  }, []);

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', newBooking);
      // After successful booking, fetch the updated list of bookings
      fetchBookings(); 
      setNewBooking({ vehicleId: '', userName: '', bookingDate: '' }); // Reset form
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="bookings-page">
      <h2>Book a Vehicle</h2>
      <div className="booking-form">
        <form onSubmit={handleBookingSubmit}>
          <select
            value={newBooking.vehicleId}
            onChange={(e) => setNewBooking({ ...newBooking, vehicleId: e.target.value })}
            required
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} ({vehicle.type} - {vehicle.price})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Your Name"
            value={newBooking.userName}
            onChange={(e) => setNewBooking({ ...newBooking, userName: e.target.value })}
            required
          />
          <input
            type="date"
            value={newBooking.bookingDate}
            onChange={(e) => setNewBooking({ ...newBooking, bookingDate: e.target.value })}
            required
          />
          <button type="submit">Book Now</button>
        </form>
      </div>

      <h2>Current Bookings</h2>
      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking) => {
            const vehicle = vehicles.find(v => v.id === booking.vehicleId);  // Find vehicle from sample data
            return (
              <div key={booking._id} className="booking-card">
                <h3>{booking.userName}</h3>
                <p>Vehicle: {vehicle ? vehicle.name : 'N/A'} ({vehicle ? vehicle.type : 'N/A'})</p>
                <p>Price: {vehicle ? vehicle.price : 'N/A'}</p>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Status: {booking.bookingStatus || 'Pending'}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
