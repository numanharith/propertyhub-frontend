/**
 * A general dashboard page that might redirect or show content based on user type.
 * Can be used as the default protected route.
 */
import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types/domain';

const DashboardPage: React.FC = () => {
    const { user, isAuthenticated, dashboardData, refreshUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            // Should be handled by ProtectedRoute, but safety first
            navigate('/login');
        } else if (user) {
            // Redirect based on user type once user data is loaded
            if (user.userType === UserType.AGENT) {
                navigate('/agent-dashboard', { replace: true });
            } else if (user.userType === UserType.OWNER) {
                // Assuming an OwnerDashboard page exists
                // navigate('/owner-dashboard', { replace: true });
                // Placeholder: Show a generic message or redirect elsewhere
                 console.log("Redirecting OWNER to a placeholder dashboard view.");
                 // Implement OwnerDashboardPage and redirect
            } else {
                // Default view for standard USER or ADMIN
                console.log(`User type ${user.userType} is authenticated.`);
                 // Display general user dashboard content here
            }
        }
        // Note: refreshUser is called by AuthProvider on initial load/login.
        // Calling it here again might cause unnecessary fetches unless needed for manual refresh.
    }, [user, isAuthenticated, navigate]); // Rerun effect if user or auth status changes

     // While redirecting, show a loading or redirect message
     if (!user) {
        return <div className="container">Loading user data...</div>;
     }

    // Fallback or default rendering for USER/ADMIN if no specific dashboard redirect
     if (user.userType !== UserType.AGENT && user.userType !== UserType.OWNER) {
         return (
             <div className="container">
                 <h1>Welcome, {user.email}</h1>
                 <p>User Type: {user.userType}</p>
                 {/* Add general user content here */}
                 <button onClick={refreshUser}>Refresh Dashboard Data</button> {/* Example refresh */}
                 {dashboardData && (
                     <div className="general-dashboard-data">
                         <h2>Your Info</h2>
                         {/* Display general user relevant info from dashboardData */}
                         <p>Active Listings (if any as Owner): {dashboardData.activeListingsCount}</p> {/* This might be 0 for non-owners */}
                         {/* Add more general data */}
                     </div>
                 )}
             </div>
         );
     }

    // AGENT and OWNER types are handled by useEffect redirects
     return <div className="container">Redirecting...</div>; // This shouldn't be displayed long
};

export default DashboardPage;