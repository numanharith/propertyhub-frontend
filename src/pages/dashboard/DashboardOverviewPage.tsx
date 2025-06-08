import React, { useEffect, useState } from 'react';
import { ListChecks, Eye, MessageSquareText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import * as propertyService from '@/services/propertyService'; // Assuming this can fetch user's properties
import { PropertySummary, UserDetails } from '@/types/api';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const response = await propertyService.getProperties({ size: 100 }); // Fetch all for mock filtering
        // const userListings = response.content.filter(p => (p.lister && p.lister.username === user.username) || (p.id && parseInt(p.id) <= 2));

        setListings(response.content);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) return <LoadingSpinner text="Loading overview..."/>;

  const activeListingsCount = listings.filter(p => (p.status || p.listingType) !== 'Inactive').length; // Example of active
  const totalViewsThisMonth = Math.floor(Math.random() * 2000) + 500; // Mock data
  const newInquiriesCount = 3; // Mock data

  return (
    <section id="overview-section" className="dashboard-section">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome back, {user?.firstName || user?.username}!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full"><ListChecks className="w-8 h-8 text-blue-500" /></div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{activeListingsCount}</p>
            <p className="text-sm text-gray-500">Active Listings</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full"><Eye className="w-8 h-8 text-green-500" /></div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{totalViewsThisMonth.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Views This Month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full"><MessageSquareText className="w-8 h-8 text-red-500" /></div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{newInquiriesCount}</p>
            <p className="text-sm text-gray-500">New Inquiries</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity (Placeholder)</h3>
        <ul className="space-y-3">
          <li className="flex items-center text-sm text-gray-600">
            {/* Using i tag for lucide as per original HTML structure, if window.lucide is available globally */}
            <i data-lucide="check-circle" className="w-5 h-5 text-green-500 mr-2"></i> Listing "Orchard Condo" approved.
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <i data-lucide="message-circle" className="w-5 h-5 text-blue-500 mr-2"></i> New inquiry for "Sentosa Villa".
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <i data-lucide="edit-3" className="w-5 h-5 text-yellow-500 mr-2"></i> You updated "HDB at Clementi".
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DashboardOverviewPage;
