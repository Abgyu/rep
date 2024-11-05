import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Haddii user uusan jirin, wuxuu user-ka u diraa login page-ka
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Haddii user uu jiro, wuxuu tusayaa component-ka children
  return children;
};

export default ProtectedRoute;