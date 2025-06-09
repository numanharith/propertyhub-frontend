import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as propertyService from '@/services/propertyService';
import { PropertySummary } from '@/types/api';
import { formatPrice } from '@/utils/formatters';
import { Plus, Edit2, Trash2, Eye as EyeIcon } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

const MyListingsPage: React.FC = () => {
  const [myListings, setMyListings] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();


  useEffect(() => {
    const fetchMyListings = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const response = await propertyService.getPropertiesByUser({size: 100}); // Fetch all for mock
        // const userListings = response.content.filter(p => (p.lister && p.lister.username === user.username) || (p.id && parseInt(p.id) <= 2) ); // Example mock filter
        console.log(response)
        setMyListings(response.content);
      } catch (error) {
        console.error("Failed to fetch user listings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyListings();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await propertyService.deleteProperty(id);
        setMyListings(prev => prev.filter(p => p.id !== id));
        // Add a success notification if desired
      } catch (error) {
        console.error("Failed to delete property:", error);
        // Add an error notification
      }
    }
  };

  if (isLoading) return <LoadingSpinner text="Loading your listings..." />;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Listings</h2>
        <Button variant="primary" size="md" className="flex items-center">
          <Link to="/dashboard/add-listing" className="flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Add New
          </Link>
        </Button>
      </div>
      <div className="bg-white p-2 md:p-4 rounded-lg shadow-md overflow-x-auto">
        {myListings.length === 0 ? (
          <p className="text-center p-4 text-gray-500">You have no listings yet. <Link to="/dashboard/add-listing" className="text-primary hover:underline">Add one now!</Link></p>
        ) : (
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Property</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Price</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Views</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Inquiries</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map(prop => (
                <tr key={prop.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-gray-800">{prop.title}</div>
                    <div className="text-xs text-gray-500">{prop.location}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ (prop.status || prop.listingType) === 'For Sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {prop.status || prop.listingType}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 hidden sm:table-cell">
                    {formatPrice(prop.price)} {(prop.status || prop.listingType) === 'For Rent' ? '/mo' : ''}
                  </td>
                  <td className="p-3 text-sm text-gray-700 hidden md:table-cell">{Math.floor(Math.random() * 500)}</td>
                  <td className="p-3 text-sm text-gray-700 hidden md:table-cell">{Math.floor(Math.random() * 10)}</td>
                  <td className="p-3">
                    <Link to={`/dashboard/edit-listing/${prop.id}`} className="text-primary hover:text-primary-dark p-1 inline-block" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(prop.id)} className="text-red-500 hover:text-red-700 p-1" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link to={`/property_details/${prop.id}`} target="_blank" className="text-gray-500 hover:text-gray-700 p-1 inline-block" title="View">
                      <EyeIcon className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyListingsPage;
