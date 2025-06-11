import {
  PropertyCreateUpdateRequest,
  PropertyDetail,
  PropertyQueryFilters,
  PropertySummary,
  CreateFsboListingRequest,
  ListingResponse,
} from "@/types/api";
import apiClient from "./apiClient";
import api from "./api";

export const getProperties = async (
  filters?: PropertyQueryFilters
): Promise<{ content: PropertySummary[]; total: number }> => {
  console.log("Fetching properties with filters:", filters);
  const response = await apiClient.get<{
    content: PropertySummary[];
    total: number;
  }>("/properties/all", { params: filters });
  return response.data;
};

export const getPropertiesByUser = async (
  filters?: PropertyQueryFilters
): Promise<{ content: PropertySummary[]; total: number }> => {
  console.log("Fetching properties with filters:", filters);
  const response = await apiClient.get<{
    content: PropertySummary[];
    total: number;
  }>("/properties/by-token-email", { params: filters });
  return response.data;
};

export const getPropertyById = async (id: string): Promise<PropertyDetail> => {
  console.log("Fetching property by ID:", id);
  const response = await apiClient.get<PropertyDetail>(`/properties/${id}`);
  return response.data;
};

export const createProperty = async (
  propertyData: PropertyCreateUpdateRequest
): Promise<PropertyDetail> => {
  console.log("Creating property with data:", propertyData);
  const response = await apiClient.post<PropertyDetail>(
    "/properties",
    propertyData
  );
  return response.data;
};

export const updateProperty = async (
  id: string,
  propertyData: PropertyCreateUpdateRequest
): Promise<PropertyDetail> => {
  console.log("Updating property ID:", id, "with data:", propertyData);
  const response = await apiClient.put<PropertyDetail>(
    `/properties/${id}`,
    propertyData
  );
  return response.data;
};

export const deleteProperty = async (id: string): Promise<void> => {
  console.log("Deleting property ID:", id);
  await apiClient.delete(`/properties/${id}`);
};

/**
 * Creates a new For Sale By Owner (FSBO) listing.
 * Requires the authenticated user to have the 'OWNER' role.
 * @param data - The data for the new FSBO listing.
 * @returns A promise resolving with the created listing response.
 */
export const createFsboListing = async (data: CreateFsboListingRequest): Promise<ListingResponse> => {
  console.log("Creating FSBO listing with data:", data);
  const response = await api.post<ListingResponse>('/listings/fsbo', data);
  return response.data;
};

// Additional listing-related methods can be added here as needed
// For example:
// export const getListingById = async (id: number): Promise<ListingDetailsResponse> => { ... }
// export const updateListing = async (id: number, data: UpdateListingRequest): Promise<ListingResponse> => { ... }

