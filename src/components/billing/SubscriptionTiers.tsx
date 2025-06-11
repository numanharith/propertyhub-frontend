/**
 * Component to display available agent subscription tiers.
 * Allows user to select and initiate subscription.
 */
import React, { useEffect, useState } from 'react';
import * as UserService from '../../services/userService';
import { AgentTierDto } from '../../types/api';
import { useAuth } from '../../hooks/useAuth';
import { UserType, SubscriptionStatus } from '../../types/domain';
import { useNavigate } from 'react-router-dom';


const SubscriptionTiers: React.FC = () => {
    const [tiers, setTiers] = useState<AgentTierDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, userSubscription, userTier, refreshUser } = useAuth(); // Get current user/subscription info
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch available tiers on component mount
        UserService.getAllAgentTiers()
            .then(data => {
                setTiers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching agent tiers:', err);
                setError('Failed to load subscription tiers.');
                setLoading(false);
            });
    }, []);

    const handleSubscribe = async (tierId: number) => {
        if (!user) {
             // This case should ideally be prevented by route protection, but good fallback
             alert("Please log in to subscribe.");
             navigate('/login');
             return;
        }

         if (user.userType !== UserType.AGENT && user.userType !== UserType.USER) {
            alert("Only agents or users becoming agents can subscribe to tiers.");
            return;
        }

        setLoading(true); // Or a specific loading state for the button
        setError(null);

        try {
             // Initiate the subscription process via the backend service
             // This service call should ideally return the Stripe Checkout session URL.
             // Based on the backend reference, subscribeToTier service initiates Checkout
             // and the controller POST /agent-tiers/{tierId}/subscribe should return CheckoutResponse.
             // Let's assume the endpoint returns CheckoutResponse.
             await UserService.subscribeToTier(tierId); // Assuming service returns CheckoutResponse

             // For now, since we're returning UserSubscriptionDto, just show success
             alert("Subscription initiated successfully!");
             refreshUser(); // Refresh user data to reflect new tier/subscription
             navigate('/agent-dashboard'); // Or a confirmation page

        } catch (err: any) {
            console.error('Error subscribing to tier:', err);
            setError(err.message || 'An error occurred during subscription.');
            setLoading(false); // Ensure loading state is reset
        }
    };

     // Check if a tier is the user's current active tier
    const isCurrentTier = (tierId: number): boolean => {
        return userSubscription?.status === SubscriptionStatus.ACTIVE && userSubscription.tier.id === tierId;
    };

     // Check if a tier is more expensive than the current one (for upgrade logic)
    const isUpgrade = (tierMonthlyFee: number): boolean => {
        if (!userTier) return true; // No current tier is an upgrade
        return tierMonthlyFee > userTier.monthlyFee;
    };


    if (loading) {
        return <div className="container">Loading tiers...</div>;
    }

    if (error) {
        return <div className="container error-message">{error}</div>;
    }

    return (
        <div className="pricing-container container">
            <h1>Choose Your Agent Plan</h1>

            <div className="tier-list">
                {tiers.map(tier => (
                    <div key={tier.id} className={`tier-card ${isCurrentTier(tier.id) ? 'current-tier' : ''}`}>
                        <h3>{tier.name} {isCurrentTier(tier.id) && '(Current Plan)'}</h3>
                        <p>{tier.description}</p>
                        <div className="tier-features">
                            <p>Max Active Listings: {tier.maxActiveListings === 0 ? 'Unlimited' : tier.maxActiveListings}</p>
                            <p>Max Leads per Month: {tier.maxLeadsPerMonth === 0 ? 'Unlimited' : tier.maxLeadsPerMonth}</p>
                            <p>Price per Lead: ${tier.pricePerLead.toFixed(2)}</p>
                        </div>
                        <div className="tier-price">
                            <p>${tier.monthlyFee.toFixed(2)} / month</p>
                        </div>

                        {user?.userType === UserType.AGENT && isCurrentTier(tier.id) ? (
                            <button disabled>Your Current Plan</button>
                        ) : (
                            <button onClick={() => handleSubscribe(tier.id)} disabled={loading}>
                                {loading ? 'Processing...' : (isCurrentTier(tier.id) ? 'Current Plan' : (userTier && !isUpgrade(tier.monthlyFee) ? 'Downgrade' : 'Subscribe'))}
                            </button>
                        )}
                         {/* Add conditional logic for upgrade/downgrade messaging and possible different payment flow */}

                    </div>
                ))}
            </div>

             {/* Link back to dashboard */}
            {user?.userType === UserType.AGENT && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button onClick={() => navigate('/agent-dashboard')}>Back to Dashboard</button>
                </div>
            )}
        </div>
    );
};

export default SubscriptionTiers;