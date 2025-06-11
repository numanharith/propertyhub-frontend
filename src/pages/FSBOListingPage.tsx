/**
 * Page component wrapper for the FSBO Listing Form.
 */
import React from 'react';
import FSBOListingForm from '../components/fsbo/FSBOListingForm';
import { useAuth } from '../hooks/useAuth';
import { UserType } from '../types/domain';
import { Navigate } from 'react-router-dom';

const FSBOListingPage: React.FC = () => {
     const { isAuthenticated, userType } = useAuth();

     // Simple check to ensure only OWNERS or potentially basic USERS (who will become OWNERS) can access
     // More robust protection is via ProtectedRoute if used in App.tsx
     if (!isAuthenticated || (userType !== UserType.OWNER && userType !== UserType.USER)) {
         // Optionally redirect or show error if not the right user type
         return <Navigate to="/dashboard" replace />; // Or redirect to login if not auth
     }

    return (
        <div className="page-container">
            <FSBOListingForm />
        </div>
    );
};

export default FSBOListingPage;