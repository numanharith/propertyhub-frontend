import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyCreateUpdateRequest } from '@/types/api';
import * as propertyService from '@/services/propertyService';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import { Save } from 'lucide-react';

const initialFormState: PropertyCreateUpdateRequest = {
  title: '',
  description: '',
  price: 0,
  location: '',
  address: '', // Can be same as location or more specific
  propertyType: 'Condo',
  listingType: 'For Sale',
  bedrooms: 1,
  bathrooms: 1,
  areaSqFt: 0,
  amenities: [],
  imageUrls: [], // URLs of uploaded images
};

const AddListingPage: React.FC = () => {
  const [formData, setFormData] = useState<PropertyCreateUpdateRequest>(initialFormState);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: typeSpecificValue(name, value, e.target.type)
    }));
  };

  const typeSpecificValue = (name: string, value: string, type: string) => {
    if (['price', 'bedrooms', 'bathrooms', 'areaSqFt'].includes(name) || type === 'number') {
      return parseFloat(value) || 0;
    }
    return value;
  };

  const handleAmenityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentAmenities = prev.amenities || [];
      if (checked) {
        return { ...prev, amenities: [...currentAmenities, value] };
      } else {
        return { ...prev, amenities: currentAmenities.filter(a => a !== value) };
      }
    });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5); // Max 5 photos
      const newPreviews: string[] = [];
      // For MVP, we'll use object URLs for preview. In a real app, upload files and get URLs.
      const newImageUrls: string[] = []; 
      
      files.forEach(file => {
        newPreviews.push(URL.createObjectURL(file));
        // Simulate getting a URL after upload
        newImageUrls.push(`/mock/uploads/${file.name}`); // Placeholder URL
      });
      setPhotoPreviews(newPreviews);
      setFormData(prev => ({ ...prev, imageUrls: newImageUrls }));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await propertyService.createProperty(formData);
      // alert('Property listed successfully!'); // Or use a nicer notification component
      setFormData(initialFormState); // Reset form
      setPhotoPreviews([]);
      navigate('/dashboard/my-listings');
    } catch (err: any) {
      setError(err.message || "Failed to add listing.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const amenityOptions = ["Pool", "Gym", "Parking", "Balcony", "Garden", "Security", "Pet Friendly"];


  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Property Listing</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-6">
        {error && <ErrorMessage message={error} />}
        <Input label="Property Title / Name" name="title" value={formData.title} onChange={handleChange} required />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label>
            <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary focus:border-primary">
              <option value="Condo">Condo</option>
              <option value="HDB Flat">HDB Flat</option>
              <option value="Landed House">Landed House</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
          <div>
            <label htmlFor="listingType" className="block text-sm font-medium text-gray-700">Listing Type</label>
            <select id="listingType" name="listingType" value={formData.listingType} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary focus:border-primary">
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
        </div>

        <Input label="Location (e.g. District, Neighborhood)" name="location" value={formData.location} onChange={handleChange} required />
        <Input label="Full Address" name="address" value={formData.address} onChange={handleChange} required />


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Price / Rental Rate (SGD)" name="price" type="number" value={String(formData.price)} onChange={handleChange} required />
          <Input label="Bedrooms" name="bedrooms" type="number" min="0" value={String(formData.bedrooms)} onChange={handleChange} required />
          <Input label="Bathrooms" name="bathrooms" type="number" min="0" value={String(formData.bathrooms)} onChange={handleChange} required />
        </div>

        <Input label="Built-up Area (sqft)" name="areaSqFt" type="number" min="0" value={String(formData.areaSqFt)} onChange={handleChange} required />
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
          <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto border p-2 rounded-md">
                {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center">
                    <input 
                        type="checkbox" 
                        name="amenities" 
                        value={amenity} 
                        checked={formData.amenities.includes(amenity)}
                        onChange={handleAmenityChange}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">{amenity}</span>
                </label>
                ))}
            </div>
        </div>

        <div>
          <label htmlFor="listing-photos" className="block text-sm font-medium text-gray-700">Upload Photos (Max 5)</label>
          <input type="file" id="listing-photos" name="photos" multiple accept="image/*" onChange={handlePhotoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"/>
          <div id="photo-previews" className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {photoPreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md border border-gray-300" />
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full md:w-auto" isLoading={isLoading}>
            <Save className="w-5 h-5 mr-2 inline-block" /> Save Listing
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddListingPage;
