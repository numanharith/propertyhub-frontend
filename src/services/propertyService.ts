import apiClient from './apiClient';
import { PropertySummary, PropertyDetail, PropertyCreateUpdateRequest, PropertyQueryFilters } from '@/types/api';
import { mockProperties } from '@/utils/mockData'; // Using centralized mock data

export const getProperties = async (filters?: PropertyQueryFilters): Promise<{data: PropertySummary[], total: number}> => {
  console.log('Fetching properties with filters:', filters);
  // MOCK IMPLEMENTATION
  let properties = [...mockProperties];

  if (filters) {
    if (filters.location) {
      properties = properties.filter(p => p.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    if (filters.propertyType) {
      properties = properties.filter(p => p.propertyType.toLowerCase().replace(' ', '') === filters.propertyType!.toLowerCase());
    }
    if (filters.listingType) {
        properties = properties.filter(p => p.listingType.toLowerCase().replace(' ', '') === filters.listingType!.toLowerCase().replace(' ', ''));
    }
    if (filters.bedrooms) {
        properties = properties.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    // Add more filters as needed based on PropertyQueryFilters
  }
  
  const total = properties.length;
  const page = filters?.page || 1;
  const size = filters?.size || 6; // Default size for pagination
  const paginatedData = properties.slice((page - 1) * size, page * size);

  return Promise.resolve({ data: paginatedData, total });
  // const response = await apiClient.get<{data: PropertySummary[], total: number}>('/properties', { params: filters });
  // return response.data;
};

export const getPropertyById = async (id: string): Promise<PropertyDetail> => {
  console.log('Fetching property by ID:', id);
  // MOCK IMPLEMENTATION
  const property = mockProperties.find(p => p.id === id) as PropertyDetail | undefined;
  if (property) {
    return Promise.resolve(property);
  } else {
    return Promise.reject(new Error('Property not found'));
  }
  // const response = await apiClient.get<PropertyDetail>(`/properties/${id}`);
  // return response.data;
};

export const createProperty = async (propertyData: PropertyCreateUpdateRequest): Promise<PropertyDetail> => {
  console.log('Creating property with data:', propertyData);
  const response = await apiClient.post<PropertyDetail>('/properties', propertyData);
  return response.data;
};

export const updateProperty = async (id: string, propertyData: PropertyCreateUpdateRequest): Promise<PropertyDetail> => {
  console.log('Updating property ID:', id, 'with data:', propertyData);
  // MOCK IMPLEMENTATION
   const index = mockProperties.findIndex(p => p.id === id);
   if (index !== -1) {
    mockProperties[index] = { ...mockProperties[index], ...propertyData } as any;
    return Promise.resolve(mockProperties[index] as unknown as PropertyDetail);
  }
  return Promise.reject(new Error('Property not found for update'));
  // const response = await apiClient.put<PropertyDetail>(`/properties/${id}`, propertyData);
  // return response.data;
};

export const deleteProperty = async (id: string): Promise<void> => {
  console.log('Deleting property ID:', id);
  // MOCK IMPLEMENTATION
  const index = mockProperties.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProperties.splice(index, 1);
    return Promise.resolve();
  }
  return Promise.reject(new Error('Property not found for deletion'));
  // await apiClient.delete(`/properties/${id}`);
};
