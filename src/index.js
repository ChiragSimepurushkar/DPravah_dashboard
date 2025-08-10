import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import { CookiesProvider } from 'react-cookie'; 
import ProtectedRoute from './components/ProtectRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);

