/**
 * Page component to handle cancelled payment redirects.
 */
import React from 'react';
import PaymentStatusPage from '../components/billing/PaymentStatusPage';

const PaymentCancelPage: React.FC = () => {
     return <PaymentStatusPage status="cancel" />;
};

export default PaymentCancelPage;