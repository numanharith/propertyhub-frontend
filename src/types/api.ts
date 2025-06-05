export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwtToken: string;
  user: UserDetails; // Added user details to auth response for convenience
}

export interface UserDetails {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'seeker' | 'lister' | 'admin'; // Example roles
}

export interface PropertySummary {
  id: string;
  title: string;
  price: number;
  location: string;
  propertyType: string; // e.g., 'Condo', 'HDB Flat', 'Landed House', 'Apartment'
  listingType: string; // e.g., 'For Sale', 'For Rent'
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  mainImageUrl: string;
  dateAdded?: string; // Optional: for sorting by newest
  amenities?: string[]; // From mock data
  status?: string; // From mock data (seems same as listingType)
}

export interface PropertyDetail extends PropertySummary {
  description: string;
  address: string;
  latitude?: number;
  longitude?: number;
  amenities: string[];
  imageUrls: string[];
  lister: {
    id: string;
    username: string;
    avatar?: string; // from mock data
    agency?: string; // from mock data
    phone?: string; // from mock data
  };
}

export interface PropertyCreateUpdateRequest {
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  latitude?: number;
  longitude?: number;
  propertyType: string;
  listingType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  amenities: string[];
  imageUrls: string[]; // For MVP, assume URLs are provided. Actual upload is complex.
}

// For search/filter query parameters
export interface PropertyQueryFilters {
  page?: number;
  size?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number; // Added from mock filter form
  propertyType?: string;
  listingType?: string;
  keywords?: string; // Added from mock filter form
  amenities?: string[]; // Added from mock filter form
  sizeMin?: number; // Added from mock filter form
  sizeMax?: number; // Added from mock filter form
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'date_desc'; // Added from mock sort
}

// Mock Agent type based on property_details_page.js
export interface AgentInfo {
    name: string;
    agency: string;
    phone: string;
    email: string;
    avatar: string;
}

// Extending PropertyDetail for consistency with mock data used in PropertyDetailsPage
export interface PropertyDetailMock extends PropertyDetail {
  images: string[]; // from mock data (alias for imageUrls)
  agent: AgentInfo; // from mock data (alias for lister)
  type: string; // from mock data (alias for propertyType)
  status: string; // from mock data (alias for listingType)
  size: number; // from mock data (alias for areaSqFt)
}
