// In dashboard/src/api/axiosConfig.js

import axios from 'axios';

// Create a new axios instance for the dashboard project
const api = axios.create({
  baseURL: 'http://localhost:3002', // Your backend URL
  withCredentials: true, // This is crucial for sending cookies
});

export default api;