import {
  PropertyCreateUpdateRequest,
  PropertyDetail,
  PropertyQueryFilters,
  PropertySummary,
} from "@/types/api";
import apiClient from "./apiClient";

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
