type UserRoles = "ROLE_SEEKER" | "ROLE_LISTER" | "ROLE_ADMIN";

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
  role: UserRoles;
  userId: string;
  username: string;
}

export interface UserDetails {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRoles;
  userType?: string; // Adding for compatibility
}

export interface PropertySummary {
  id: string;
  title: string;
  description?: string;
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
    fullName: string;
    phone: string;
    agency?: string;
    avatar?: string;
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
  priceMin?: number; // Additional for compatibility
  priceMax?: number; // Additional for compatibility
  bedrooms?: number;
  bathrooms?: number; // Added from mock filter form
  propertyType?: string;
  listingType?: string;
  keywords?: string; // Added from mock filter form
  amenities?: string[]; // Added from mock filter form
  sizeMin?: number; // Added from mock filter form
  sizeMax?: number; // Added from mock filter form
  sortBy?: "relevance" | "price_asc" | "price_desc" | "date_desc"; // Added from mock sort
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
import { LeadStatus, PaymentStatus, SubscriptionStatus, ReferralStatus } from './domain';

export interface AgentTierDto {
    id: number;
    name: string;
    description: string;
    maxActiveListings: number;
    maxLeadsPerMonth: number;
    pricePerLead: number;
    monthlyFee: number;
    createdAt: string; // LocalDateTime as string
    updatedAt: string; // LocalDateTime as string
}

export interface UserSubscriptionDto {
    id: number;
    tier: AgentTierDto;
    startDate: string; // LocalDateTime as string
    endDate: string | null; // LocalDateTime as string or null
    status: SubscriptionStatus;
    createdAt: string; // LocalDateTime as string
    updatedAt: string; // LocalDateTime as string
    // Add other fields if needed
}

export interface UserDto {
    id: number;
    email: string;
    userType: 'USER' | 'AGENT' | 'OWNER' | 'ADMIN'; // Or map to UserType enum
    // Add other user-related fields
}

export interface UserDashboardResponse {
    user: UserDto;
    tier: AgentTierDto | null;
    subscription: UserSubscriptionDto | null;
    activeListingsCount: number;
    leadsReceived: number;
    billedAmountLastMonth: number | null; // Sum of relevant payments
    // Add payment history summary or other data
}

export interface CreateFsboListingRequest {
    title: string;
    description: string;
    price: number; // BigDecimal as number
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number; // Double as number
    // Other property details...

    // Contact info for FSBO owner (will be stored in JSONB on backend)
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
}

export interface ListingResponse {
    id: number;
    title: string;
    status: string; // Assuming Property has a status field like PENDING_PAYMENT
    price: number; // BigDecimal as number
    // ... other relevant listing details
}

export interface SubmitLeadRequest {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface LeadResponse {
    id: number;
    propertyId: number;
    inquirerName: string;
    inquirerEmail: string;
    inquirerPhone: string;
    status: LeadStatus;
    assignedAgentId: number | null;
    createdAt: string; // LocalDateTime as string
    // ... other details
}

export interface UpdateLeadStatusRequest {
    status?: LeadStatus;
    verificationDetails?: string; // For verify endpoint
    agentId?: number; // For assign endpoint
}

export interface CheckoutRequest {
    itemType: 'SUBSCRIPTION_FEE' | 'LEAD_CHARGE' | 'FSBO_LISTING_FEE' | 'REFERRAL_PAYOUT'; // Or map to PaymentType enum
    itemId: number; // e.g., listing ID, tier ID, subscription ID, lead ID
    amount: number;
    currency: string;
    successUrl: string;
    cancelUrl: string;
    userId: number; // Backend will likely get this from auth context, but useful for request object definition
}

export interface CheckoutResponse {
    checkoutSessionId: string;
    paymentUrl: string; // URL to redirect user for payment
}

export interface ServicePartner {
    id: number;
    name: string;
    serviceType: string;
    contactEmail: string | null;
    contactPhone: string | null;
    websiteUrl: string | null;
    logoUrl: string | null;
    referralFeePercentage: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ReferralTransaction {
    id: number;
    referringUser: UserDto; // Placeholder, could be just ID
    referredUser: UserDto | null; // Placeholder, could be just ID
    partner: ServicePartner;
    referralDate: string;
    status: ReferralStatus;
    conversionDate: string | null;
    estimatedValue: number | null;
    payoutAmount: number | null;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}
