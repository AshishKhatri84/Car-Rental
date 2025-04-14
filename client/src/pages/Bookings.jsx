import React, { useState, useEffect } from 'react';
import './Bookings.css';

const BookingsPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    vehicleId: '',
    userName: '',
    bookingDate: '',
  });

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (storedVehicles && storedVehicles.length > 0) {
      // Convert _id to id (number or string as per use)
      const formattedVehicles = storedVehicles.map((v) => ({
        id: v._id,
        name: v.name,
        type: v.type,
        price: v.price,
      }));
      setVehicles(formattedVehicles);
    } else {
      // Fallback sample vehicles
      setVehicles([
        { id: '1', name: 'Tesla Model 3', type: 'Electric', price: '$90/day' },
        { id: '2', name: 'Ford Mustang', type: 'Convertible', price: '$120/day' },
        { id: '3', name: 'Toyota Innova', type: 'SUV', price: '$70/day' },
      ]);
    }
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingId = Date.now().toString(); // Simulate unique ID

    const bookingToAdd = {
      _id: bookingId,
      vehicleId: newBooking.vehicleId,
      userName: newBooking.userName,
      bookingDate: newBooking.bookingDate,
      bookingStatus: 'Pending',
    };

    setBookings([...bookings, bookingToAdd]);
    setNewBooking({ vehicleId: '', userName: '', bookingDate: '' });
  };

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((b) => b._id !== id);
    setBookings(updatedBookings);
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
            const vehicle = vehicles.find(v => v.id === booking.vehicleId);
            return (
              <div key={booking._id} className="booking-card">
                <h3>{booking.userName}</h3>
                <p>Vehicle: {vehicle ? vehicle.name : 'N/A'} ({vehicle ? vehicle.type : 'N/A'})</p>
                <p>Price: {vehicle ? vehicle.price : 'N/A'}</p>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Status: {booking.bookingStatus}</p>
                <button className="btn-danger" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
