import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If user exists, show the page (Outlet). If not, redirect to Login.
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;