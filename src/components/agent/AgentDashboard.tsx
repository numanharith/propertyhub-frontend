// src/components/agent/AgentDashboard.tsx
/**
 * Enhanced Agent Dashboard component with tier management, lead tracking, and analytics
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LeadManagementTable from './LeadManagementTable';
import { LeadResponse } from '../../types/api';
import { updateLeadStatus } from '../../services/leadService';
import { LeadStatus } from '../../types/domain';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  AlertTriangle,
  Plus,
  BarChart3,
  Crown,
  MessageSquare
} from 'lucide-react';

const AgentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { dashboardData, user, userTier } = useAuth();
    const [leads, setLeads] = useState<LeadResponse[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'analytics'>('overview');

    // Mock data for demonstration
    const mockLeads: LeadResponse[] = [
        {
            id: 1,
            propertyId: 101,
            inquirerName: 'John Doe',
            inquirerEmail: 'john.doe@email.com',
            inquirerPhone: '+65 9123 4567',
            status: LeadStatus.VERIFIED,
            assignedAgentId: parseInt(user?.id || '1'),
            createdAt: '2024-06-08T10:30:00Z'
        },
        {
            id: 2,
            propertyId: 102,
            inquirerName: 'Jane Smith',
            inquirerEmail: 'jane.smith@email.com',
            inquirerPhone: '+65 8765 4321',
            status: LeadStatus.ASSIGNED,
            assignedAgentId: parseInt(user?.id || '1'),
            createdAt: '2024-06-07T14:20:00Z'
        },
        {
            id: 3,
            propertyId: 103,
            inquirerName: 'Mike Wilson',
            inquirerEmail: 'mike.wilson@email.com',
            inquirerPhone: '+65 9876 5432',
            status: LeadStatus.PENDING_VERIFICATION,
            assignedAgentId: null,
            createdAt: '2024-06-06T16:45:00Z'
        }
    ];

    useEffect(() => {
        if (user?.userType === 'AGENT') {
            setLoadingLeads(true);
            
            // For demo, use mock data
            setLeads(mockLeads);
            setLoadingLeads(false);
            
            // Uncomment for real API
            // getMyLeads()
            //     .then(setLeads)
            //     .catch(err => {
            //         console.error("Error fetching leads:", err);
            //         setLeadsError("Failed to load leads.");
            //     })
            //     .finally(() => setLoadingLeads(false));
        }
    }, [user]);

    const handleUpdateLeadStatus = async (leadId: number, newStatus: LeadStatus) => {
        try {
            await updateLeadStatus(leadId, { status: newStatus });
            setLeads(prev => prev.map(lead => 
                lead.id === leadId ? { ...lead, status: newStatus } : lead
            ));
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const handlePayForLead = (leadId: number) => {
        navigate(`/billing/lead-payment/${leadId}`);
    };

    const handleViewLeadDetails = (leadId: number) => {
        navigate(`/leads/${leadId}`);
    };

    const handleContactLead = (leadId: number, method: 'phone' | 'email') => {
        const lead = leads.find(l => l.id === leadId);
        if (lead) {
            if (method === 'phone') {
                window.open(`tel:${lead.inquirerPhone}`);
            } else {
                window.open(`mailto:${lead.inquirerEmail}`);
            }
        }
    };

    if (!user || user.userType !== 'AGENT') {
        return <div className="container">Access Denied: Not an Agent user.</div>;
    }

    const tierInfo = userTier || {
        id: 1,
        name: 'Basic',
        maxActiveListings: 5,
        maxLeadsPerMonth: 10,
        pricePerLead: 50,
        monthlyFee: 0
    };

    const usageData = dashboardData || {
        activeListingsCount: 3,
        leadsReceived: leads.length,
        billedAmountLastMonth: 150
    };

    const isNearLimit = usageData.activeListingsCount >= tierInfo.maxActiveListings * 0.8;
    const leadsThisMonth = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        const now = new Date();
        return leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear();
    }).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user.username || user.email}</p>
                </div>

                {/* Tier Status Card */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center mb-2">
                                <Crown className="w-6 h-6 mr-2" />
                                <h2 className="text-xl font-semibold">{tierInfo.name} Plan</h2>
                            </div>
                            <p className="text-blue-100">Monthly Fee: ${tierInfo.monthlyFee}</p>
                        </div>
                        <button
                            onClick={() => navigate('/pricing')}
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Upgrade Plan
                        </button>
                    </div>
                </div>

                {/* Usage Limits Warning */}
                {isNearLimit && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                            <div>
                                <h3 className="text-yellow-800 font-medium">Approaching Listing Limit</h3>
                                <p className="text-yellow-700 text-sm">
                                    You're using {usageData.activeListingsCount} of {tierInfo.maxActiveListings} listings. 
                                    <button 
                                        onClick={() => navigate('/pricing')}
                                        className="ml-1 underline hover:no-underline"
                                    >
                                        Upgrade to add more listings.
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Active Listings</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {usageData.activeListingsCount}/{tierInfo.maxActiveListings}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Leads This Month</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {leadsThisMonth}/{tierInfo.maxLeadsPerMonth}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Leads</p>
                                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <DollarSign className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Billed Last Month</p>
                                <p className="text-2xl font-bold text-gray-900">${usageData.billedAmountLastMonth || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'overview'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'leads'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Lead Management ({leads.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'analytics'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Analytics
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => navigate('/dashboard/add-listing')}
                                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        disabled={usageData.activeListingsCount >= tierInfo.maxActiveListings}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {usageData.activeListingsCount >= tierInfo.maxActiveListings 
                                            ? 'Listing Limit Reached' 
                                            : 'Add New Listing'}
                                    </button>
                                    
                                    <button
                                        onClick={() => navigate('/service-partners')}
                                        className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        Browse Service Partners
                                    </button>
                                    
                                    <button
                                        onClick={() => setActiveTab('analytics')}
                                        className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                                    >
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        View Analytics
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {leads.slice(0, 3).map((lead) => (
                                        <div key={lead.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <MessageSquare className="w-5 h-5 text-blue-500" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    New inquiry from {lead.inquirerName}
                                                </p>
                                                <p className="text-xs text-gray-500">Property #{lead.propertyId}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'leads' && (
                    <div>
                        {loadingLeads ? (
                            <div className="flex justify-center items-center h-64">Loading leads...</div>
                        ) : (
                            <LeadManagementTable
                                leads={leads}
                                onUpdateStatus={handleUpdateLeadStatus}
                                onPayForLead={handlePayForLead}
                                onViewDetails={handleViewLeadDetails}
                                onContactLead={handleContactLead}
                            />
                        )}
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            <div className="text-center">
                                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                                <p className="font-medium">Analytics Dashboard Coming Soon</p>
                                <p className="text-sm">Track your performance, conversion rates, and earnings</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentDashboard;