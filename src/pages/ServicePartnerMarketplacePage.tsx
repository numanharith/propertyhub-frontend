import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Briefcase,
  CheckCircle,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ServicePartner {
  id: number;
  name: string;
  serviceType: string;
  description: string;
  contactEmail: string | null;
  contactPhone: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  referralFeePercentage: number;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  specialties: string[];
  yearsOfExperience: number;
  clientsServed: number;
  verified: boolean;
}

const ServicePartnerMarketplacePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [partners, setPartners] = useState<ServicePartner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<ServicePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock data for service partners
  const mockPartners: ServicePartner[] = [
    {
      id: 1,
      name: 'Elite Home Staging Co.',
      serviceType: 'Home Staging',
      description: 'Professional home staging services to maximize your property\'s appeal and selling potential.',
      contactEmail: 'contact@elitehomestaging.sg',
      contactPhone: '+65 9123 4567',
      websiteUrl: 'https://elitehomestaging.sg',
      logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100',
      referralFeePercentage: 15,
      isActive: true,
      rating: 4.8,
      reviewCount: 127,
      location: 'Central Singapore',
      specialties: ['Luxury Properties', 'Condo Staging', 'Quick Turnaround'],
      yearsOfExperience: 8,
      clientsServed: 450,
      verified: true
    },
    {
      id: 2,
      name: 'Prime Property Photography',
      serviceType: 'Photography',
      description: 'High-quality property photography and virtual tours to showcase your listings.',
      contactEmail: 'bookings@primephoto.sg',
      contactPhone: '+65 8765 4321',
      websiteUrl: 'https://primephoto.sg',
      logoUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=100',
      referralFeePercentage: 10,
      isActive: true,
      rating: 4.9,
      reviewCount: 203,
      location: 'Islandwide',
      specialties: ['Drone Photography', 'Virtual Tours', '3D Modeling'],
      yearsOfExperience: 6,
      clientsServed: 800,
      verified: true
    },
    {
      id: 3,
      name: 'SecureMove Logistics',
      serviceType: 'Moving Services',
      description: 'Reliable and professional moving services for property transitions.',
      contactEmail: 'hello@securemove.sg',
      contactPhone: '+65 9876 5432',
      websiteUrl: 'https://securemove.sg',
      logoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100',
      referralFeePercentage: 12,
      isActive: true,
      rating: 4.6,
      reviewCount: 89,
      location: 'Singapore',
      specialties: ['International Moves', 'Storage Solutions', 'Fragile Items'],
      yearsOfExperience: 12,
      clientsServed: 2000,
      verified: true
    },
    {
      id: 4,
      name: 'GreenSpace Landscaping',
      serviceType: 'Landscaping',
      description: 'Transform outdoor spaces to enhance property value and curb appeal.',
      contactEmail: 'projects@greenspace.sg',
      contactPhone: '+65 8234 5678',
      websiteUrl: null,
      logoUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100',
      referralFeePercentage: 18,
      isActive: true,
      rating: 4.7,
      reviewCount: 156,
      location: 'West Singapore',
      specialties: ['Garden Design', 'Maintenance', 'Water Features'],
      yearsOfExperience: 15,
      clientsServed: 600,
      verified: false
    },
    {
      id: 5,
      name: 'FastFix Handyman Services',
      serviceType: 'Maintenance & Repair',
      description: 'Quick and reliable handyman services for property maintenance and repairs.',
      contactEmail: 'support@fastfix.sg',
      contactPhone: '+65 9345 6789',
      websiteUrl: 'https://fastfix.sg',
      logoUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100',
      referralFeePercentage: 8,
      isActive: true,
      rating: 4.4,
      reviewCount: 312,
      location: 'Islandwide',
      specialties: ['Electrical', 'Plumbing', 'Painting', 'Air-con Servicing'],
      yearsOfExperience: 10,
      clientsServed: 1500,
      verified: true
    },
    {
      id: 6,
      name: 'LegalEase Property Law',
      serviceType: 'Legal Services',
      description: 'Specialized legal services for property transactions and disputes.',
      contactEmail: 'enquiry@legalease.sg',
      contactPhone: '+65 6789 0123',
      websiteUrl: 'https://legalease.sg',
      logoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100',
      referralFeePercentage: 20,
      isActive: true,
      rating: 4.9,
      reviewCount: 78,
      location: 'CBD',
      specialties: ['Property Law', 'Conveyancing', 'Dispute Resolution'],
      yearsOfExperience: 20,
      clientsServed: 500,
      verified: true
    }
  ];

  const categories = [
    'all',
    'Home Staging',
    'Photography',
    'Moving Services',
    'Landscaping',
    'Maintenance & Repair',
    'Legal Services'
  ];

  const locations = [
    'all',
    'Central Singapore',
    'West Singapore',
    'East Singapore',
    'North Singapore',
    'South Singapore',
    'CBD',
    'Islandwide'
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setPartners(mockPartners);
      setFilteredPartners(mockPartners);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = partners;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(partner => partner.serviceType === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(partner => partner.location === selectedLocation);
    }

    setFilteredPartners(filtered);
  }, [partners, searchTerm, selectedCategory, selectedLocation]);

  const handleConnect = (partner: ServicePartner) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/auth';
      return;
    }

    // In a real app, this would create a referral record
    alert(`Connecting you with ${partner.name}. They will be notified of your referral.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Partner Marketplace</h1>
          <p className="text-lg text-gray-600">
            Connect with trusted service providers to enhance your property business
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services, companies, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPartners.length} of {partners.length} service partners
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={partner.logoUrl || 'https://via.placeholder.com/60'}
                      alt={partner.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                        {partner.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                        )}
                      </div>
                      <p className="text-blue-600 text-sm font-medium">{partner.serviceType}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{partner.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({partner.reviewCount} reviews)</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{partner.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{partner.yearsOfExperience} years exp.</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{partner.clientsServed}+ clients</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-4 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{partner.location}</span>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {partner.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{partner.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Referral Fee */}
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Referral Fee:</span>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">{partner.referralFeePercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-2 mb-4">
                  {partner.contactPhone && (
                    <a
                      href={`tel:${partner.contactPhone}`}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  )}
                  
                  {partner.contactEmail && (
                    <a
                      href={`mailto:${partner.contactEmail}`}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </a>
                  )}
                  
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  )}
                </div>

                {/* Connect Button */}
                <button
                  onClick={() => handleConnect(partner)}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect & Earn Referral
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No service partners found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find service partners.
            </p>
          </div>
        )}

        {/* Call to Action for Service Providers */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
          <p className="text-xl mb-6">Join our network and connect with property professionals</p>
          <div className="space-y-2 mb-6">
            <p className="text-purple-100">✓ Access to qualified leads</p>
            <p className="text-purple-100">✓ Competitive referral fees</p>
            <p className="text-purple-100">✓ Growing network of agents and owners</p>
          </div>
          <Link
            to="/auth"
            className="bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Join as Service Partner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicePartnerMarketplacePage;