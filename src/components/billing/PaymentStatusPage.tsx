/**
 * Component to handle redirects from payment gateways (e.g., Stripe success/cancel URLs).
 * Parses URL parameters (like session_id) and interacts with backend/state.
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // To refresh user data after payment

interface PaymentStatusPageProps {
    status: 'success' | 'cancel';
}

const PaymentStatusPage: React.FC<PaymentStatusPageProps> = ({ status }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { refreshUser } = useAuth(); // Function to refetch user/dashboard data

    const [message, setMessage] = useState<string>('Processing payment status...');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sessionId = searchParams.get('session_id'); // Stripe parameter
        // Other parameters could be present depending on gateway/setup

        if (status === 'success' && sessionId) {
            // Backend Stripe webhook handles the actual payment verification and record updates.
            // The frontend's role is usually just to display a success message
            // and possibly trigger a data refresh (like dashboard data).
            // No direct API call from frontend to 'verify' or 'finalize' the payment is typically needed or secure.

            setMessage('Payment successful! Updating your account...');
            setIsLoading(false); // The actual update is async via webhook

            // Trigger a refresh of user data after a short delay
            // to allow the backend webhook to process and update the database.
            const refreshDelay = setTimeout(() => {
                refreshUser()
                    .then(() => {
                         setMessage('Payment successful! Your account has been updated.');
                         // Redirect to dashboard or appropriate page after successful update
                         navigate('/dashboard'); // Or '/agent-dashboard', '/owner-dashboard'
                    })
                    .catch(err => {
                        console.error("Error refreshing user data after payment success:", err);
                        setError("Payment successful, but failed to refresh account data. Data will update shortly.");
                        setMessage("Payment successful!"); // Display success anyway
                        setIsLoading(false); // Stop loading despite refresh error
                        // Still navigate away, user can refresh manually
                         navigate('/dashboard');
                    });
            }, 2000); // 2-second delay to allow webhook processing

             return () => clearTimeout(refreshDelay); // Clean up timeout

        } else if (status === 'cancel') {
            setMessage('Payment was cancelled.');
            setIsLoading(false);
             // Optional: Log or show specific error based on params if available
            // Redirect to a relevant page (e.g., the checkout initiation page, or dashboard)
            const redirectDelay = setTimeout(() => {
                navigate('/pricing'); // Example: Go back to pricing page if subscription was cancelled
                 // Or navigate to the FSBO form if listing payment was cancelled
                 // Need logic to determine WHERE to navigate based on what was being paid for.
                 // This might require passing item type/id in cancelUrl metadata if possible,
                 // or relying on browser history.
            }, 3000);
             return () => clearTimeout(redirectDelay);

        } else {
            // Handle cases with missing session ID or invalid status
            setError('Invalid payment status page access.');
            setMessage('There was an issue processing your payment status.');
            setIsLoading(false);
        }
    }, [status, searchParams, navigate, refreshUser]); // Dependencies

    return (
        <div className="container payment-status-page">
            {isLoading ? (
                <p>{message}</p>
            ) : (
                <>
                    <h1>{status === 'success' ? 'Payment Successful' : 'Payment Cancelled'}</h1>
                    <p>{message}</p>
                    {error && <p className="error-message">{error}</p>}
                     {/* Optional: Add a link to go back */}
                    <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
                </>
            )}
        </div>
    );
};

export default PaymentStatusPage;