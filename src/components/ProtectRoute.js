// src/components/ProtectedRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useCookies } from 'react-cookie';

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
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       // Get the token from localStorage. If it's not there, redirect immediately.
  //       const token = localStorage.getItem('authToken');
  //       if (!token) {
  //         window.location.href = 'http://d-pravah-frontend.vercel.app/login';
  //         return; // Stop execution
  //       }

  //       // The axios interceptor automatically adds the token to the header.
  //       const { data } = await api.post('/verify');

  //       if (data.status) {
  //         // --- SUCCESS ---
  //         // The user is valid. We are done loading.
  //         setIsLoading(false);
  //       } else {
  //         // --- FAILURE ---
  //         // The token is invalid. Remove it and redirect.
  //         localStorage.removeItem('authToken');
  //         window.location.href = 'http://d-pravah-frontend.vercel.app/login';
  //       }
  //     } catch (error) {
  //       // --- FAILURE ---
  //       // An error occurred. Remove any token and redirect.
  //       localStorage.removeItem('authToken');
  //       window.location.href = 'http://d-pravah-frontend.vercel.app/login';
  //     }
  //   };

  //   verifyUser();
  // }, []); // The empty array ensures this runs only once

  // // If we are still loading, show a loading message.
  // if (isLoading) {
  //   return <div>Loading Dashboard...</div>;
  // }

  // // If loading is finished and we haven't redirected, it means the user is
  // // authenticated. Render the children (your Home component).
  // return children;



  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const authCheck = async () => {
  //     // First, check if a token was passed in the URL
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const tokenFromUrl = urlParams.get('token');

  //     let tokenToVerify = null;

  //     if (tokenFromUrl) {
  //       // If we found a token in the URL, save it to our localStorage
  //       localStorage.setItem('authToken', tokenFromUrl);
  //       tokenToVerify = tokenFromUrl;

  //       // Clean the URL so the token isn't visible to the user
  //       window.history.replaceState({}, document.title, window.location.pathname);
  //     } else {
  //       // If no token in URL, check localStorage (for subsequent page loads)
  //       tokenToVerify = localStorage.getItem('authToken');
  //     }

  //     // If we still don't have a token, the user is not authenticated
  //     if (!tokenToVerify) {
  //       window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //       window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //       return;
  //     }

  //     // Now, verify the token we found
  //     try {
  //       const { data } = await api.post('/verify'); // Interceptor adds the token
  //       if (data.status) {
  //         // Success! Stop loading and show the dashboard.
  //         setIsLoading(false);
  //       } else {
  //         // Token is invalid, clear storage and redirect
  //         localStorage.removeItem('authToken');
  //         window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //       }
  //     } catch (error) {
  //       // Verification request failed, clear storage and redirect
  //       localStorage.removeItem('authToken');
  //       window.location.href = 'https://d-pravah-frontend.vercel.app/login';
  //     }
  //   };

  //   authCheck();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }


    const [cookies] = useCookies(['token']);

  // We check the authentication status first.
  const isAuthenticated = !!cookies.token;

  useEffect(() => {
    // This effect will run if the authentication status changes.
    // If the user is NOT authenticated, we perform the external redirect.
    if (!isAuthenticated) {
      window.location.href = 'https://d-pravah-frontend.vercel.app/login';
    }
  }, [isAuthenticated]); // Dependency array ensures this runs only when needed.

  // If the user is authenticated, show the protected content.
  // If not, show nothing while the redirect happens.
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;