// src/types/domain.ts
/**
 * TypeScript enums derived from backend Enums.
 */

export enum UserType {
    USER = 'USER',
    AGENT = 'AGENT',
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
}

export enum ListingType {
    AGENT = 'AGENT',
    FSBO = 'FSBO',
}

export enum LeadStatus {
    PENDING_VERIFICATION = 'PENDING_VERIFICATION',
    VERIFIED = 'VERIFIED',
    ASSIGNED = 'ASSIGNED',
    PAID = 'PAID',
    LOST = 'LOST',
}

export enum PaymentType {
    SUBSCRIPTION_FEE = 'SUBSCRIPTION_FEE',
    LEAD_CHARGE = 'LEAD_CHARGE',
    FSBO_LISTING_FEE = 'FSBO_LISTING_FEE',
    REFERRAL_PAYOUT = 'REFERRAL_PAYOUT',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
    BILLED = 'BILLED', // Used by backend for leads added to invoice
    NA = 'NA', // Added for leads not billed
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED',
}

export enum ReferralStatus {
    INITIATED = 'INITIATED',
    CONTACTED = 'CONTACTED',
    CONVERTED = 'CONVERTED',
    PAID = 'PAID',
}

export enum InquiryStatus {
    OPEN = 'OPEN',
    CONVERTED_TO_LEAD = 'CONVERTED_TO_LEAD',
    DISMISSED = 'DISMISSED',
}
