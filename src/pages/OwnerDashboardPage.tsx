import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import OwnerDashboard from '../components/owner/OwnerDashboard';
import { UserType } from '../types/domain';

const OwnerDashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Ensure only OWNERS can access this page
  if (!isAuthenticated || (user?.userType !== UserType.OWNER && user?.userType !== 'OWNER')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <OwnerDashboard />;
};

export default OwnerDashboardPage;