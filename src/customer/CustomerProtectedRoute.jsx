import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCustomer } from './CustomerContext';

export default function CustomerProtectedRoute({ children }) {
  const { customer } = useCustomer();

  if (!customer.isAuthenticated) {
    return <Navigate to="/customer/auth" replace />;
  }

  return children ? children : <Outlet />;
}
