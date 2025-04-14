import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h1 className="App-logo">CarRental</h1>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/Vehicles">Browse Cars</a></li>
          <li><a href="/Bookings">My Bookings</a></li>
          <li><a href="/Login">Login</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
    </Router>
  );
}

export default App;