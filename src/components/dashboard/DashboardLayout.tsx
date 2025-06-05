import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getDashboardTitle = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'overview':
      case 'dashboard': // For base /dashboard route
        return 'Overview';
      case 'my-listings':
        return 'My Listings';
      case 'add-listing':
        return 'Add New Listing';
      case 'profile':
        return 'Profile Management';
      case 'inquiries':
        return 'Inquiries';
      default:
        return 'Dashboard';
    }
  };

  useEffect(() => {
    // Close sidebar on route change on mobile
    if (sidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname, sidebarOpen]);


  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={getDashboardTitle()} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
