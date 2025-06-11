/**
 * Page component to handle successful payment redirects.
 */
import React from 'react';
import PaymentStatusPage from '../components/billing/PaymentStatusPage';

const PaymentSuccessPage: React.FC = () => {
     return <PaymentStatusPage status="success" />;
};

export default PaymentSuccessPage;