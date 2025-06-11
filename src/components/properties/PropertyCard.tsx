import React from 'react';
import { Link } from 'react-router-dom';
import { PropertySummary } from '@/types/api';
import { formatPrice } from '@/utils/formatters';
import { MapPin, BedDouble, Bath, MoveHorizontal } from 'lucide-react';

interface PropertyCardProps {
  property: PropertySummary;
  isDetailedView?: boolean; // For search results page styling
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isDetailedView = false }) => {
  const imageSrc = property.mainImageUrl || '/assets/images/property_placeholder_1.svg';

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden property-card flex flex-col ${isDetailedView ? 'md:flex-row' : ''}`}>
      <Link to={`/properties/${property.id}`} className={`${isDetailedView ? 'md:w-2/5 h-64 md:h-auto' : 'w-full h-56'} block`}>
        <img src={imageSrc} alt={property.title} className="w-full h-full object-cover" />
      </Link>
      <div className={`p-6 flex flex-col flex-grow ${isDetailedView ? 'md:w-3/5' : ''}`}>
        <h3 className="text-xl font-semibold text-primary mb-2 truncate" title={property.title}>
          <Link to={`/properties/${property.id}`} className="hover:underline">{property.title}</Link>
        </h3>
        <p className="text-gray-600 text-sm mb-1 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" /> {property.location}
        </p>
        <p className="text-2xl font-bold text-secondary my-2">
          {formatPrice(property.price)} {property.listingType === 'For Rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
        </p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700 mb-4">
          <span className="flex items-center"><BedDouble className="w-4 h-4 mr-1 text-primary-light" /> {property.bedrooms} Beds</span>
          <span className="flex items-center"><Bath className="w-4 h-4 mr-1 text-primary-light" /> {property.bathrooms} Baths</span>
          <span className="flex items-center"><MoveHorizontal className="w-4 h-4 mr-1 text-primary-light" /> {property.areaSqFt} sqft</span>
        </div>

        {isDetailedView && property.description && (
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {property.description.substring(0, 100)}{property.description.length > 100 ? '...' : ''}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link 
            to={`/properties/${property.id}`} 
            className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
