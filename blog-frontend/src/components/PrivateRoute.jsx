import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

const PrivateRoute = ({ children, isAuthenticated }) => {
  // Access isAuthenticated directly from context (no need to pass it as prop)
  const { isAuthenticated: authStatus } = useContext(AuthContext);

  if (!authStatus) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default PrivateRoute;
