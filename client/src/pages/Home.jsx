import React from 'react';
import './Home.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h2>Rent a Car in Seconds</h2>
        <p>Affordable. Fast. Reliable.</p>
        <a href="/Vehicles" className="cta-button">Explore Cars</a>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Reserve your ride in just a few clicks.</p>
        </div>
        <div className="feature-card">
          <h3>Verified Cars</h3>
          <p>All vehicles are quality-checked and insured.</p>
        </div>
        <div className="feature-card">
          <h3>24/7 Support</h3>
          <p>Get help anytime during your rental.</p>
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2025 CarRental Inc. All rights reserved.
        </p>
        <p>
          Contact: <a href="mailto:carrental@gmail.com" target='blank'>carrental@gmail.com</a> | <span></span>  Phone: +1234567890 | <span></span>  Address: abc, xyz, 12345
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
