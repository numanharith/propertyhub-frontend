import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Phone, Mail, MapPin } from 'lucide-react';

const AgentsPage: React.FC = () => {
  // Mock agents data
  const agents = [
    {
      id: '1',
      name: 'Sarah Johnson',
      agency: 'Premium Properties SG',
      rating: 4.8,
      reviews: 127,
      phone: '+65 9123 4567',
      email: 'sarah.johnson@premium.sg',
      location: 'Orchard Road',
      specialties: ['Condominiums', 'Luxury Homes'],
      avatar: 'https://i.pravatar.cc/150?u=agent1',
      activeListings: 24
    },
    {
      id: '2',
      name: 'Michael Chen',
      agency: 'Elite Realty',
      rating: 4.9,
      reviews: 89,
      phone: '+65 8765 4321',
      email: 'michael.chen@elite.sg',
      location: 'Marina Bay',
      specialties: ['Commercial', 'Investment Properties'],
      avatar: 'https://i.pravatar.cc/150?u=agent2',
      activeListings: 18
    },
    {
      id: '3',
      name: 'Amanda Lim',
      agency: 'City Properties',
      rating: 4.7,
      reviews: 156,
      phone: '+65 9876 5432',
      email: 'amanda.lim@city.sg',
      location: 'Tanjong Pagar',
      specialties: ['HDB Resale', 'First-time Buyers'],
      avatar: 'https://i.pravatar.cc/150?u=agent3',
      activeListings: 31
    },
    {
      id: '4',
      name: 'David Tan',
      agency: 'Urban Living SG',
      rating: 4.6,
      reviews: 203,
      phone: '+65 8234 5678',
      email: 'david.tan@urban.sg',
      location: 'Bugis',
      specialties: ['Rental Properties', 'Young Professionals'],
      avatar: 'https://i.pravatar.cc/150?u=agent4',
      activeListings: 42
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Property Agent</h1>
          <p className="text-lg text-gray-600">Connect with experienced agents who know the Singapore property market</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Areas</option>
                <option value="orchard">Orchard Road</option>
                <option value="marina">Marina Bay</option>
                <option value="tanjong">Tanjong Pagar</option>
                <option value="bugis">Bugis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Specialties</option>
                <option value="condo">Condominiums</option>
                <option value="hdb">HDB Resale</option>
                <option value="commercial">Commercial</option>
                <option value="rental">Rental Properties</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Search Agents
              </button>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-gray-600">{agent.agency}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{agent.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({agent.reviews} reviews)</span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{agent.location}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">{agent.activeListings}</span> active listings
                </div>

                <div className="flex gap-2 mb-4">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </a>
                </div>

                <Link
                  to={`/agents/${agent.id}`}
                  className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Are You a Property Agent?</h2>
          <p className="text-xl mb-6">Join our network and connect with potential clients</p>
          <Link
            to="/auth"
            className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join as Agent
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;