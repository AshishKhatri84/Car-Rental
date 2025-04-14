// src/api.js
import axios from 'axios';

const API_URL = "https://api-car.onrender.com" || "http://localhost:5000/api"; 

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const getCars = async () => {
  return axios.get(`${API_URL}/cars`);
};
