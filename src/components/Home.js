import React from 'react';

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Home() {
const [cookies, setCookie, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      // If there's no token cookie, redirect to the login page of the 'front' app
      if (!cookies.token) {
        window.location.href = "http://localhost:3000/login"; // Use the URL of your 'front' app
        return; // Stop execution
      }

      // Verify the token with the backend
      try {
        // IMPORTANT: Make sure this URL points to your actual verification endpoint
        const { data } = await axios.post(
          "http://localhost:3002/verify", // Changed to a more specific endpoint
          {},
          { withCredentials: true }
        );

        const { status, user } = data;
        if (status) {
          // FIX: Use user.username, not the whole user object
          setUsername(user.username);
          toast(`Hello ${user}`, { position: "top-right" });
        } else {
          // If verification fails, remove the bad cookie and redirect to login
          removeCookie("token");
          window.location.href = "http://localhost:3000/login";
        }
      } catch (error) {
        console.error("Verification failed:", error);
        removeCookie("token");
        window.location.href = "http://localhost:3000/login";
      }
    };

    verifyUser();
  }, [cookies, removeCookie]); // navigate is removed from dependencies

  const Logout = () => {
    removeCookie("token");
    // Redirect to the login page of the 'front' app
    window.location.href = "http://localhost:3001/login";
  };
    return ( 
        <>
        <TopBar username={username} onLogout={Logout}/>
        {/* <TopBar/> */}
        <Dashboard/>
         <ToastContainer />
        </>
     );
};

export default Home;