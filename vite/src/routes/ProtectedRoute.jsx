import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check for auth token in localStorage

  if (!token) {
    // If token is not found, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token is found, render the child components (protected routes)
  return children;
};

export default ProtectedRoute;
