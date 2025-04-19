# Car Rental Booking System

A full-stack car rental platform built with Node.js, Express, React, and MongoDB. This application allows users to browse available cars, make bookings, and manage rentals. The project is deployed on Vercel, but currently, MongoDB is not connected to the deployment.

## 🚀 Live Demo

https://car-rental-xi-blue.vercel.app/

> **Note:** The live demo is hosted on Vercel. However, MongoDB is not connected to the deployment, so data persistence features may not function as expected.

## 📁 Project Structure

```plaintext
car-rental/
├── api/               # Backend API (Node.js + Express)
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── controllers/   # Business logic
│   ├── config/        # DB config, environment
│   └── server.js      # Main server entry point
├── client/            # Frontend (React)
│   ├── components/    # Reusable React components
│   ├── pages/         # React pages
│   ├── assets/        # Images, icons, etc.
│   └── App.js         # Main App component
├── .env               # Environment variables (to be created)
├── package.json       # Root project config
└── README.md          # Project documentation
```

## 🛠️ Technologies Used

- **Frontend:**
  - React
  - CSS
  - HTML

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose)

- **Deployment:**
  - Vercel (Frontend)
  - Database - Not connected

## ⚙️ Setup Instructions

1. **Clone the Repository:**

```bash
git clone https://github.com/AshishKhatri84/Car-Rental.git
cd Car-Rental
```

2. **Install Backend Dependencies:**

```bash
cd api
npm install
```

3. **Install Frontend Dependencies:**

```bash
cd ../client
npm install
```

4. **Run the Backend Server:**

```bash
cd api
npm start
```

5. **Run the Frontend Development Server:**

```bash
cd ../client
npm start
```

   The frontend will be available at `http://localhost:3000`.

## 🧩 Features

- Browse available cars for rent
- User authentication and authorization
- Booking management
- Responsive design for various devices

## 🐞 Known Issues

- MongoDB is not connected to the Vercel deployment. Data persistence features are non-functional in the live demo.
- **LocalHost Recommended**
