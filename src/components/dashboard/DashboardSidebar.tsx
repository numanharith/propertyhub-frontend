import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ListChecks, PlusCircle, User, MessageSquareText, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const navLinkClasses = ({ isActive }: {isActive: boolean}) =>
    `dashboard-nav-item flex items-center px-4 py-3 rounded-lg hover:bg-white/20 transition-colors ${
      isActive ? 'active-nav bg-white/25 font-semibold' : ''
    }`;

  return (
    <aside 
      id="dashboard-sidebar" 
      className={`w-64 bg-gradient-to-b from-primary to-secondary text-white flex flex-col transition-transform duration-300 ease-in-out fixed md:static h-full z-40 
                 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="p-6 border-b border-white/20">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/images/logo.svg" alt="PropertyHub Logo" className="h-8 w-auto filter brightness-0 invert" />
          <span className="text-2xl font-bold">PropertyHub</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <NavLink to="/dashboard/overview" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <LayoutDashboard className="w-5 h-5 mr-3" /> Overview
        </NavLink>
        <NavLink to="/dashboard/my-listings" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <ListChecks className="w-5 h-5 mr-3" /> My Listings
        </NavLink>
        <NavLink to="/dashboard/add-listing" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <PlusCircle className="w-5 h-5 mr-3" /> Add New Listing
        </NavLink>
        <NavLink to="/dashboard/profile" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <User className="w-5 h-5 mr-3" /> Profile Management
        </NavLink>
        <NavLink to="/dashboard/inquiries" className={navLinkClasses} onClick={() => setIsOpen(false)}>
          <MessageSquareText className="w-5 h-5 mr-3" /> Inquiries 
          <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">3</span> 
        </NavLink>
      </nav>
      <div className="p-4 border-t border-white/20">
        <button 
          onClick={() => { logout(); setIsOpen(false); /* Navigate to '/' or '/auth' might be needed here if not handled by ProtectedRoute */ }}
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-white/20 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
