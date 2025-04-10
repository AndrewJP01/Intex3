import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'Customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const role = localStorage.getItem('userRole');

  // If not logged in at all, redirect to home
  if (!role) {
    return <Navigate to="/" />;
  }

  // If a role is required (e.g., Admin only) and it doesn't match, redirect to MoviesPage
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/moviesPage" />;
  }

  // Auth & role checks passed, render the page
  return <>{children}</>;
};

export default ProtectedRoute;
