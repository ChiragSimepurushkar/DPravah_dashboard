// In dashboard/src/api/axiosConfig.js

import axios from 'axios';

// Create a new axios instance for the dashboard project
const api = axios.create({
  baseURL: 'https://d-pravah-backend.vercel.app',
  withCredentials: true, 
});

// This function will run before every request is sent
// api.interceptors.request.use(
//   (config) => {
//     // Get the token from localStorage
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       // If the token exists, add it to the Authorization header
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;