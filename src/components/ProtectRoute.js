// src/components/ProtectedRoute.js

import React,{useState,useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axiosConfig';

// The children prop will be the component we want to protect (e.g., <Dashboard />)
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
const [username, setUsername] = useState(''); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // The browser automatically sends the cookie with this request
        const { data } = await api.post('/verify');
        
        // Check the 'status' from your backend's /verify endpoint
        if (data.status) {
          setIsAuthenticated(true);
          setUsername(data.user); 
          setIsLoading(false);
        } else {
          // If not verified, redirect to login page
          window.location.href = 'http://localhost:3000/login';
        }
      } catch (error) {
        // If there's an error, redirect
        window.location.href = 'http://localhost:3000/login';
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []); // Empty array means this runs once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If authenticated, show the dashboard; otherwise, the redirect has already happened.
  return isAuthenticated ?  React.cloneElement(children, { username }):null;
};

export default ProtectedRoute;