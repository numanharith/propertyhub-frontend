/**
 * Page component wrapper for the Subscription Tiers component.
 */
import React from 'react';
import SubscriptionTiers from '../components/billing/SubscriptionTiers';

const PricingPage: React.FC = () => {
    return (
        <div className="page-container">
            <SubscriptionTiers />
        </div>
    );
};

export default PricingPage;