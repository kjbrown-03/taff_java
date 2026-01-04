import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/authService';

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const userRole = AuthService.getUserRole();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have an allowed role, redirect to home
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;