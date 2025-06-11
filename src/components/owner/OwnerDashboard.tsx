import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  TrendingUp,
  Users,
  Star,
  AlertCircle
} from 'lucide-react';

interface FSBOListing {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'ACTIVE' | 'PENDING_PAYMENT' | 'DRAFT' | 'EXPIRED';
  createdAt: string;
  views: number;
  inquiries: number;
  images: string[];
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED';
}

interface Inquiry {
  id: string;
  propertyId: string;
  inquirerName: string;
  inquirerEmail: string;
  inquirerPhone: string;
  message: string;
  createdAt: string;
  status: 'NEW' | 'RESPONDED' | 'CONVERTED';
  propertyTitle: string;
}

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<FSBOListing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'analytics'>('listings');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Mock FSBO listings
      const mockListings: FSBOListing[] = [
        {
          id: '1',
          title: '3-Bedroom Condo in Orchard',
          price: 1250000,
          location: 'Orchard Road',
          bedrooms: 3,
          bathrooms: 2,
          area: 1200,
          status: 'ACTIVE',
          createdAt: '2024-06-01',
          views: 234,
          inquiries: 12,
          images: ['/assets/images/property_placeholder_1.svg'],
          paymentStatus: 'PAID'
        },
        {
          id: '2',
          title: 'Cozy 2-Bedroom HDB Flat',
          price: 580000,
          location: 'Tampines',
          bedrooms: 2,
          bathrooms: 1,
          area: 850,
          status: 'PENDING_PAYMENT',
          createdAt: '2024-06-05',
          views: 67,
          inquiries: 3,
          images: ['/assets/images/property_placeholder_2.svg'],
          paymentStatus: 'PENDING'
        }
      ];

      // Mock inquiries
      const mockInquiries: Inquiry[] = [
        {
          id: '1',
          propertyId: '1',
          inquirerName: 'John Doe',
          inquirerEmail: 'john.doe@email.com',
          inquirerPhone: '+65 9123 4567',
          message: 'I am interested in viewing this property. When would be a good time?',
          createdAt: '2024-06-08',
          status: 'NEW',
          propertyTitle: '3-Bedroom Condo in Orchard'
        },
        {
          id: '2',
          propertyId: '1',
          inquirerName: 'Jane Smith',
          inquirerEmail: 'jane.smith@email.com',
          inquirerPhone: '+65 8765 4321',
          message: 'Is the price negotiable? Also, what are the maintenance fees?',
          createdAt: '2024-06-07',
          status: 'RESPONDED',
          propertyTitle: '3-Bedroom Condo in Orchard'
        }
      ];

      setListings(mockListings);
      setInquiries(mockInquiries);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteListing = (listingId: string) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(listing => listing.id !== listingId));
    }
  };

  const handlePayForListing = (listingId: string) => {
    // Redirect to payment flow
    navigate(`/fsbo/payment/${listingId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'PENDING_PAYMENT': return 'bg-yellow-100 text-yellow-700';
      case 'DRAFT': return 'bg-gray-100 text-gray-700';
      case 'EXPIRED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-700';
      case 'RESPONDED': return 'bg-green-100 text-green-700';
      case 'CONVERTED': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const totalInquiries = listings.reduce((sum, listing) => sum + listing.inquiries, 0);
  const activeLisings = listings.filter(l => l.status === 'ACTIVE').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your FSBO listings and track inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{activeLisings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{totalInquiries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Listings ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Inquiries ({inquiries.length})
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
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Listings</h2>
              <Link
                to="/fsbo/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Link>
            </div>

            <div className="space-y-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/4">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/4 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{listing.bedrooms} bed</span>
                            <span>{listing.bathrooms} bath</span>
                            <span>{listing.area} sqft</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{formatPrice(listing.price)}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(listing.status)}`}>
                            {listing.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{listing.views} views</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{listing.inquiries} inquiries</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {listing.status === 'PENDING_PAYMENT' && (
                            <button
                              onClick={() => handlePayForListing(listing.id)}
                              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                            >
                              <DollarSign className="w-4 h-4 mr-1" />
                              Pay Now
                            </button>
                          )}
                          <Link
                            to={`/properties/${listing.id}`}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                          <Link
                            to={`/fsbo/edit/${listing.id}`}
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Inquiries</h2>
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{inquiry.propertyTitle}</h3>
                      <p className="text-gray-600">{inquiry.inquirerName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInquiryStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{inquiry.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{inquiry.createdAt}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        <span>{inquiry.inquirerPhone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        <span>{inquiry.inquirerEmail}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${inquiry.inquirerPhone}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </a>
                      <a
                        href={`mailto:${inquiry.inquirerEmail}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                  <p>Analytics dashboard coming soon</p>
                  <p className="text-sm">Track your listing performance, views, and conversion rates</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;