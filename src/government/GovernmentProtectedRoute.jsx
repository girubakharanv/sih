import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGovernment } from './GovernmentContext';

export default function GovernmentProtectedRoute({ children }) {
  const { government } = useGovernment();
  const location = useLocation();

  // If not authenticated, redirect to government auth
  if (!government.isAuthenticated) {
    return <Navigate to="/government/auth" state={{ from: location }} replace />;
  }

  // If authenticated, render the requested route
  return children;
}
