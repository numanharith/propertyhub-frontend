import React, { useEffect, useState } from "react";
import { ListChecks, Eye, MessageSquareText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import * as propertyService from "@/services/propertyService";
import { PropertySummary } from "@/types/api";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const response = await propertyService.getPropertiesByUser({
          size: 100,
        }); // Fetch all for mock filtering
        setListings(response.content);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) return <LoadingSpinner text="Loading overview..." />;

  const activeListingsCount = listings.filter(
    (p) => (p.status || p.listingType) !== "Inactive"
  ).length; // Example of active
  const totalViewsThisMonth = Math.floor(Math.random() * 2000) + 500; // Mock data
  const newInquiriesCount = 3; // Mock data

  return (
    <section id="overview-section" className="dashboard-section min-h-[calc(100vh-4rem)] flex flex-col p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex-grow">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.firstName || user?.username}! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your properties today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <ListChecks className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {activeListingsCount}
              </p>
              <p className="text-sm text-gray-500">Active Listings</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {totalViewsThisMonth.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Total Views This Month</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <MessageSquareText className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {newInquiriesCount}
              </p>
              <p className="text-sm text-gray-500">New Inquiries</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Recent Activity
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <i
                data-lucide="check-circle"
                className="w-4 h-4 text-green-500 mr-2"
              ></i>
              Listing "Orchard Condo" approved.
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <i
                data-lucide="message-circle"
                className="w-4 h-4 text-blue-500 mr-2"
              ></i>
              New inquiry for "Sentosa Villa".
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <i
                data-lucide="edit-3"
                className="w-4 h-4 text-yellow-500 mr-2"
              ></i>
              You updated "HDB at Clementi".
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverviewPage;
