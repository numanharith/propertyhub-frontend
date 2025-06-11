/**
 * Page component wrapper for the Agent Dashboard.
 */
import React from 'react';
import AgentDashboard from '../components/agent/AgentDashboard';
import { useAuth } from '../hooks/useAuth';
import { UserType } from '../types/domain';
import { Navigate } from 'react-router-dom';

const AgentDashboardPage: React.FC = () => {
     const { isAuthenticated, userType } = useAuth();

     // Ensure only AGENTS can access this page
      if (!isAuthenticated || userType !== UserType.AGENT) {
         // Redirect if not authenticated or not an AGENT
         // ProtectedRoute should handle this, but this is a component-level check
         return <Navigate to="/dashboard" replace />; // Redirect to a general dashboard or login
     }

    return (
        <div className="page-container">
            <AgentDashboard />
        </div>
    );
};

export default AgentDashboardPage;