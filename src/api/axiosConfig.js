// In dashboard/src/api/axiosConfig.js

import axios from 'axios';

// Create a new axios instance for the dashboard project
const api = axios.create({
  baseURL: 'https://d-pravah-backend.vercel.app', // Your backend URL
  withCredentials: true, // This is crucial for sending cookies
});

export default api;