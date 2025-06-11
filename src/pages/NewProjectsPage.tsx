import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Building2, Star } from 'lucide-react';

const NewProjectsPage: React.FC = () => {
  // Mock new projects data
  const projects = [
    {
      id: '1',
      name: 'Marina One Residences',
      developer: 'CapitaLand',
      location: 'Marina Bay',
      expectedCompletion: '2025',
      priceRange: '$1.2M - $3.8M',
      units: 1042,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      amenities: ['Swimming Pool', 'Gym', 'Sky Garden', 'Concierge'],
      rating: 4.7,
      status: 'Launch Soon'
    },
    {
      id: '2',
      name: 'The Tre Ver',
      developer: 'City Developments Limited',
      location: 'Potong Pasir',
      expectedCompletion: '2026',
      priceRange: '$1.5M - $2.8M',
      units: 729,
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
      amenities: ['Infinity Pool', 'Tennis Court', 'BBQ Pavilion', 'Children\'s Playground'],
      rating: 4.5,
      status: 'Selling'
    },
    {
      id: '3',
      name: 'Parc Esta',
      developer: 'MCL Land',
      location: 'Eunos',
      expectedCompletion: '2024',
      priceRange: '$900K - $1.6M',
      units: 1399,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      amenities: ['Clubhouse', 'Function Hall', 'Jogging Track', 'Fitness Corner'],
      rating: 4.3,
      status: 'Under Construction'
    },
    {
      id: '4',
      name: 'Affinity at Serangoon',
      developer: 'Oxley Holdings',
      location: 'Serangoon',
      expectedCompletion: '2025',
      priceRange: '$1.1M - $2.2M',
      units: 1052,
      image: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=400',
      amenities: ['Lap Pool', 'Spa Pool', 'Gymnasium', 'Multi-purpose Hall'],
      rating: 4.6,
      status: 'Selling'
    }
  ];

  const statusColors = {
    'Launch Soon': 'bg-blue-100 text-blue-700',
    'Selling': 'bg-green-100 text-green-700',
    'Under Construction': 'bg-yellow-100 text-yellow-700'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Project Launches</h1>
          <p className="text-lg text-gray-600">Discover the latest residential developments in Singapore</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Locations</option>
                <option value="marina">Marina Bay</option>
                <option value="potong">Potong Pasir</option>
                <option value="eunos">Eunos</option>
                <option value="serangoon">Serangoon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Any Price</option>
                <option value="under1m">Under $1M</option>
                <option value="1m-2m">$1M - $2M</option>
                <option value="2m-3m">$2M - $3M</option>
                <option value="above3m">Above $3M</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="launch">Launch Soon</option>
                <option value="selling">Selling</option>
                <option value="construction">Under Construction</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Search Projects
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-gray-600">by {project.developer}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{project.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Expected Completion: {project.expectedCompletion}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.units} units</span>
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold text-blue-600">{project.priceRange}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Key Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {project.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{project.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/projects/${project.id}/register-interest`}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  >
                    Register Interest
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated on New Launches</h2>
          <p className="text-xl mb-6">Be the first to know about upcoming property developments</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectsPage;