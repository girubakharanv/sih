import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useWorker } from './WorkerContext';

export default function WorkerProtectedRoute({ children }) {
  const { worker } = useWorker();
  const location = useLocation();

  // If worker is not authenticated, redirect to worker auth
  if (!worker.isAuthenticated) {
    return <Navigate to="/worker/auth" state={{ from: location }} replace />;
  }

  // If worker is authenticated, render the requested route
  return children;
}
