// src/components/agent/LeadTable.tsx
/**
 * Table component to display a list of leads for an agent.
 * Includes basic lead actions.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadResponse } from '../../types/api';
import { LeadStatus } from '../../types/domain';
import { format } from 'date-fns';

interface LeadTableProps {
    leads: LeadResponse[];
    onMarkPaid: (leadId: number) => void; // Action to initiate payment for a lead
    onMarkLost: (leadId: number) => void; // Action to mark lead as lost
    // Add more actions as needed (e.g., view details)
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, onMarkPaid, onMarkLost }) => {
    const navigate = useNavigate();
    return (
        <div className="lead-table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Property ID</th>
                        <th>Inquirer Name</th>
                        <th>Contact Info</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <tr key={lead.id}>
                            <td>{lead.id}</td>
                            <td>{lead.propertyId}</td>
                            <td>{lead.inquirerName}</td>
                            <td>
                                {lead.inquirerEmail && <p>Email: {lead.inquirerEmail}</p>}
                                {lead.inquirerPhone && <p>Phone: {lead.inquirerPhone}</p>}
                            </td>
                            <td>{lead.status}</td>
                            <td>{lead.createdAt ? format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm') : 'N/A'}</td>
                            <td>
                                {/* Conditionally render actions based on lead status */}
                                {/* Backend reference: LeadStatus: PENDING_VERIFICATION, VERIFIED, ASSIGNED, PAID, LOST */}
                                {/* Backend reference: PaymentStatus: PENDING, SUCCESS, FAILED, REFUNDED, BILLED, NA */}

                                {/* An agent typically interacts with VERIFIED or ASSIGNED leads */}
                                {/* Billing/Payment happens via the billing service, potentially triggered by agent clicking "Pay for Lead" */}
                                {/* Assuming the backend has a mechanism to initiate payment for an ASSIGNED lead */}

                                {lead.status === LeadStatus.ASSIGNED && (
                                     // Assuming the agent must explicitly pay for leads in PAY_PER_LEAD tiers
                                    <button onClick={() => onMarkPaid(lead.id)}>
                                         Pay for Lead
                                     </button>
                                )}
                                 {lead.status !== LeadStatus.LOST && lead.status !== LeadStatus.PAID && (
                                     <button onClick={() => onMarkLost(lead.id)}>Mark as Lost</button>
                                 )}
                                {/* Add other actions like "View Details", "Contact Inquirer" */}
                                 <button onClick={() => navigate(`/leads/${lead.id}`)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadTable;