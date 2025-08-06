// src/components/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axiosConfig';

// The children prop will be the component we want to protect (e.g., <Dashboard />)
const ProtectedRoute = ({ children }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);
  // const [username, setUsername] = useState(''); 

  //   useEffect(() => {
  //     const verifyUser = async () => {
  //       try {
  //         // The browser automatically sends the cookie with this request
  //         const { data } = await api.post('/verify');

  //         // Check the 'status' from your backend's /verify endpoint
  //         if (data.status) {
  //           setIsAuthenticated(true);
  //           setUsername(data.user); 
  //           setIsLoading(false);
  //         } else {
  //           // If not verified, redirect to login page
  //           window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //         }
  //       } catch (error) {
  //         // If there's an error, redirect
  //         window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     verifyUser();
  //   }, []); // Empty array means this runs once on component mount

  //   if (isLoading) {
  //     return <div>Loading...</div>; // Or a spinner component
  //   }

  //   // If authenticated, show the dashboard; otherwise, the redirect has already happened.
  //   return isAuthenticated ?  React.cloneElement(children, { username }):null;


  // We only need one state to track if we are done loading.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Get the token from localStorage. If it's not there, redirect immediately.
        const token = localStorage.getItem('authToken');
        if (!token) {
          window.location.href = 'http://d-pravah-frontend.vercel.app/login';
          return; // Stop execution
        }

        // The axios interceptor automatically adds the token to the header.
        const { data } = await api.post('/verify');

        if (data.status) {
          // --- SUCCESS ---
          // The user is valid. We are done loading.
          setIsLoading(false);
        } else {
          // --- FAILURE ---
          // The token is invalid. Remove it and redirect.
          localStorage.removeItem('authToken');
          window.location.href = 'http://d-pravah-frontend.vercel.app/login';
        }
      } catch (error) {
        // --- FAILURE ---
        // An error occurred. Remove any token and redirect.
        localStorage.removeItem('authToken');
        window.location.href = 'http://d-pravah-frontend.vercel.app/login';
      }
    };

    verifyUser();
  }, []); // The empty array ensures this runs only once

  // If we are still loading, show a loading message.
  if (isLoading) {
    return <div>Loading Dashboard...</div>;
  }

  // If loading is finished and we haven't redirected, it means the user is
  // authenticated. Render the children (your Home component).
  return children;
};

export default ProtectedRoute;