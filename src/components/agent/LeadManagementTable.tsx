import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Phone, 
  Mail, 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import { LeadResponse } from '../../types/api';
import { LeadStatus } from '../../types/domain';

interface LeadManagementTableProps {
  leads: LeadResponse[];
  onUpdateStatus: (leadId: number, status: LeadStatus) => void;
  onPayForLead: (leadId: number) => void;
  onViewDetails: (leadId: number) => void;
  onContactLead: (leadId: number, method: 'phone' | 'email') => void;
}

const LeadManagementTable: React.FC<LeadManagementTableProps> = ({
  leads,
  onUpdateStatus,
  onPayForLead,
  onViewDetails,
  onContactLead
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date');

  const filteredLeads = leads
    .filter(lead => {
      const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
      const matchesSearch = lead.inquirerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.inquirerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        case 'name':
          return a.inquirerName.localeCompare(b.inquirerName);
        default:
          return 0;
      }
    });

  const getStatusIcon = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.PENDING_VERIFICATION:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case LeadStatus.VERIFIED:
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case LeadStatus.ASSIGNED:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case LeadStatus.PAID:
        return <DollarSign className="w-4 h-4 text-purple-500" />;
      case LeadStatus.LOST:
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.PENDING_VERIFICATION:
        return 'bg-yellow-100 text-yellow-700';
      case LeadStatus.VERIFIED:
        return 'bg-blue-100 text-blue-700';
      case LeadStatus.ASSIGNED:
        return 'bg-green-100 text-green-700';
      case LeadStatus.PAID:
        return 'bg-purple-100 text-purple-700';
      case LeadStatus.LOST:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const canUpdateStatus = (currentStatus: LeadStatus, newStatus: LeadStatus) => {
    // Define allowed status transitions
    const transitions: Record<LeadStatus, LeadStatus[]> = {
      [LeadStatus.PENDING_VERIFICATION]: [LeadStatus.VERIFIED, LeadStatus.LOST],
      [LeadStatus.VERIFIED]: [LeadStatus.ASSIGNED, LeadStatus.LOST],
      [LeadStatus.ASSIGNED]: [LeadStatus.PAID, LeadStatus.LOST],
      [LeadStatus.PAID]: [],
      [LeadStatus.LOST]: []
    };
    return transitions[currentStatus]?.includes(newStatus) || false;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Lead Management</h3>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value={LeadStatus.PENDING_VERIFICATION}>Pending Verification</option>
                <option value={LeadStatus.VERIFIED}>Verified</option>
                <option value={LeadStatus.ASSIGNED}>Assigned</option>
                <option value={LeadStatus.PAID}>Paid</option>
                <option value={LeadStatus.LOST}>Lost</option>
              </select>
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{lead.inquirerName}</div>
                    <div className="text-sm text-gray-500">{lead.inquirerEmail}</div>
                    <div className="text-sm text-gray-500">{lead.inquirerPhone}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Property #{lead.propertyId}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(lead.status)}
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {/* Contact Actions */}
                    <button
                      onClick={() => onContactLead(lead.id, 'phone')}
                      className="text-green-600 hover:text-green-700 p-1 rounded"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onContactLead(lead.id, 'email')}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onViewDetails(lead.id)}
                      className="text-gray-600 hover:text-gray-700 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Status Update Dropdown */}
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value={lead.status}>{lead.status.replace('_', ' ')}</option>
                      {Object.values(LeadStatus)
                        .filter(status => canUpdateStatus(lead.status, status))
                        .map(status => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                    </select>

                    {/* Pay for Lead Button */}
                    {lead.status === LeadStatus.ASSIGNED && (
                      <button
                        onClick={() => onPayForLead(lead.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 flex items-center"
                      >
                        <DollarSign className="w-3 h-3 mr-1" />
                        Pay
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters.' 
              : 'Leads will appear here when property inquiries are received.'}
          </p>
        </div>
      )}

      {/* Footer with pagination placeholder */}
      {filteredLeads.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
            {/* Add pagination controls here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagementTable;