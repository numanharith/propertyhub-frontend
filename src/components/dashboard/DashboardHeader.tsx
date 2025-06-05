import React from 'react';
import { Bell, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, onToggleSidebar }) => {
  const { user } = useAuth();
  const userAvatar = "https://i.pravatar.cc/150?u=lister"; // Placeholder

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <button onClick={onToggleSidebar} className="md:hidden text-gray-600 hover:text-primary">
        <MenuIcon className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-semibold text-gray-700 ml-2 md:ml-0">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-primary relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user?.firstName || user?.username || 'User'} ({user?.role || 'Lister'})
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;
