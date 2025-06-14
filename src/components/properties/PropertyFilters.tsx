import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PropertyQueryFilters } from '@/types/api';
import Button from '@/components/common/Button';

interface PropertyFiltersProps {
  initialFilters?: Partial<PropertyQueryFilters>;
  onFilterChange: (filters: Partial<PropertyQueryFilters>) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ initialFilters = {}, onFilterChange }) => {
  const [filters, setFilters] = useState<Partial<PropertyQueryFilters>>(initialFilters);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | undefined = value;
    if (type === 'number') {
      processedValue = value ? parseFloat(value) : undefined;
    }
    if (value === "") processedValue = undefined;

    setFilters(prev => ({ ...prev, [name]: processedValue }));
  };
  
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target; // name is "amenities"
    setFilters(prev => {
      const currentAmenities = prev.amenities || [];
      if (checked) {
        return { ...prev, [name]: [...currentAmenities, value] };
      } else {
        return { ...prev, [name]: currentAmenities.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  
  const amenityOptions = ["pool", "gym", "parking", "balcony", "garden", "jacuzzi"];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Results</h3>
      <form onSubmit={handleSubmit} id="filter-form-react">
        <div className="mb-4">
          <label htmlFor="price_min" className="block text-sm font-medium text-gray-700">Price Range (SGD)</label>
          <div className="flex space-x-2 mt-1">
            <input type="number" id="price_min" name="priceMin" value={filters.priceMin || ''} onChange={handleChange} placeholder="Min" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"/>
            <input type="number" id="price_max" name="priceMax" value={filters.priceMax || ''} onChange={handleChange} placeholder="Max" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"/>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <select id="bathrooms" name="bathrooms" value={filters.bathrooms || ''} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white text-sm">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="size_min" className="block text-sm font-medium text-gray-700">Property Size (sqft)</label>
            <div className="flex space-x-2 mt-1">
            <input type="number" id="size_min" name="sizeMin" value={filters.sizeMin || ''} onChange={handleChange} placeholder="Min" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"/>
            <input type="number" id="size_max" name="sizeMax" value={filters.sizeMax || ''} onChange={handleChange} placeholder="Max" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"/>
          </div>
        </div>
          <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords</label>
          <input type="text" id="keywords" name="keywords" value={filters.keywords || ''} onChange={handleChange} placeholder="e.g., renovated, MRT" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"/>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {amenityOptions.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input 
                  type="checkbox" 
                  name="amenities" 
                  value={amenity} 
                  checked={filters.amenities?.includes(amenity) || false}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600 capitalize">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        <Button type="submit" variant="secondary" className="w-full">Apply Filters</Button>
      </form>
    </div>
  );
};

export default PropertyFilters;
