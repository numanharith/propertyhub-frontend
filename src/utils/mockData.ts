// Using a slightly modified structure to align with PropertySummary/PropertyDetail types
// and to make it suitable for direct use in services.
import { PropertyDetail } from '@/types/api';


export const mockProperties: PropertyDetail[] = [
    {
        id: "1",
        title: "Spacious Condo with City View",
        propertyType: "Condo",
        listingType: "For Sale",
        location: "Orchard Road, Singapore",
        price: 1200000,
        bedrooms: 3,
        bathrooms: 2,
        areaSqFt: 1500,
        description: "A beautifully designed 3-bedroom condo in the heart of Orchard Road. Enjoy stunning city views, modern amenities, and unparalleled convenience. Perfect for families or investors.",
        imageUrls: ["/assets/images/property_placeholder_1.svg", "/assets/images/property_placeholder_2.svg", "/assets/images/property_placeholder_3.svg"],
        mainImageUrl: "/assets/images/property_placeholder_1.svg",
        lister: {
            id: "agent1",
            fullName: "Jane Smith",
            agency: "Luxury Homes SG",
            phone: "+65 9876 5432",
            avatar: "https://i.pravatar.cc/150?u=agent1"
        },
        amenities: ["pool", "gym", "parking", "balcony"],
        address: "123 Orchard Rd, Singapore 238888",
        dateAdded: "2025-05-28"
    },
    {
        id: "2",
        title: "Cozy HDB Flat near MRT",
        propertyType: "HDB Flat",
        listingType: "For Rent",
        location: "Clementi Ave 3, Singapore",
        price: 2800, // per month
        bedrooms: 2,
        bathrooms: 2,
        areaSqFt: 850,
        description: "Well-maintained 2-bedroom HDB flat, just a 5-minute walk from Clementi MRT. Fully furnished with air conditioning. Ideal for small families or working professionals.",
        imageUrls: ["/assets/images/property_placeholder_2.svg", "/assets/images/property_placeholder_3.svg"],
        mainImageUrl: "/assets/images/property_placeholder_2.svg",
        lister: {
            id: "agent2",
            fullName: "Robert Tan",
            agency: "Heartland Realty",
            phone: "+65 9123 4567",
            avatar: "https://i.pravatar.cc/150?u=agent2"
        },
        amenities: ["parking", "aircon"],
        address: "Blk 456 Clementi Ave 3, Singapore 120456",
        dateAdded: "2025-06-01"
    },
    {
        id: "3",
        title: "Luxury Landed House with Private Pool",
        propertyType: "Landed House",
        listingType: "For Sale",
        location: "Sentosa Cove, Singapore",
        price: 8500000,
        bedrooms: 5,
        bathrooms: 6,
        areaSqFt: 5500,
        description: "Exclusive landed property in Sentosa Cove offering breathtaking sea views and a private pool. Features spacious living areas, a gourmet kitchen, and high-end finishes throughout.",
        imageUrls: ["/assets/images/property_placeholder_3.svg", "/assets/images/property_placeholder_1.svg"],
        mainImageUrl: "/assets/images/property_placeholder_3.svg",
        lister: {
            id: "agent3",
            fullName: "Michelle Lim",
            agency: "Prestige Properties",
            phone: "+65 8888 7777",
            avatar: "https://i.pravatar.cc/150?u=agent3"
        },
        amenities: ["pool", "parking", "balcony", "garden", "sea view"],
        address: "1 Ocean Drive, Sentosa Cove, Singapore 098888",
        dateAdded: "2025-05-15"
    },
    {
        id: "4",
        title: "Modern Apartment in CBD",
        propertyType: "Apartment",
        listingType: "For Rent",
        location: "Tanjong Pagar, Singapore",
        price: 4500, // per month
        bedrooms: 1,
        bathrooms: 1,
        areaSqFt: 600,
        description: "Stylish 1-bedroom apartment in the CBD, perfect for singles or couples. High floor unit with amazing city skyline views. Includes access to gym and rooftop pool.",
        imageUrls: ["/assets/images/property_placeholder_1.svg"],
        mainImageUrl: "/assets/images/property_placeholder_1.svg",
        lister: {
            id: "agent4",
            fullName: "David Lee",
            agency: "City Living Rentals",
            phone: "+65 9999 0000",
            avatar: "https://i.pravatar.cc/150?u=agent4"
        },
        amenities: ["pool", "gym", "city view"],
        address: "78 Shenton Way, Singapore 079120",
        dateAdded: "2025-06-02"
    },
    {
        id: "5",
        title: "Renovated 4-Room HDB",
        propertyType: "HDB Flat",
        listingType: "For Sale",
        location: "Bishan St 12, Singapore",
        price: 680000,
        bedrooms: 3,
        bathrooms: 2,
        areaSqFt: 1100,
        description: "Beautifully renovated 4-room HDB flat in a prime Bishan location. Move-in condition with modern interior design. Close to schools and amenities.",
        imageUrls: ["/assets/images/property_placeholder_2.svg", "/assets/images/property_placeholder_1.svg"],
        mainImageUrl: "/assets/images/property_placeholder_2.svg",
        lister: {
            id: "agent5",
            fullName: "Sarah Chen",
            agency: "SG Property Deals",
            phone: "+65 9777 6666",
            avatar: "https://i.pravatar.cc/150?u=agent5"
        },
        amenities: ["parking", "renovated"],
        address: "Blk 123 Bishan St 12, Singapore 570123",
        dateAdded: "2025-05-20"
    },
    {
        id: "6",
        title: "Penthouse Unit with Panoramic Views",
        propertyType: "Condo",
        listingType: "For Sale",
        location: "Marina Bay, Singapore",
        price: 5500000,
        bedrooms: 4,
        bathrooms: 5,
        areaSqFt: 3200,
        description: "Luxurious penthouse unit offering unobstructed panoramic views of the Marina Bay skyline. Features a private lift, expansive balcony, and top-of-the-line fittings.",
        imageUrls: ["/assets/images/property_placeholder_3.svg", "/assets/images/property_placeholder_2.svg", "/assets/images/property_placeholder_1.svg"],
        mainImageUrl: "/assets/images/property_placeholder_3.svg",
        lister: {
            id: "agent1", // Same agent as property 1 for testing user listings
            fullName: "Jane Smith",
            agency: "Luxury Homes SG",
            phone: "+65 9876 5432",
            avatar: "https://i.pravatar.cc/150?u=agent1"
        },
        amenities: ["pool", "gym", "parking", "balcony", "jacuzzi", "private lift"],
        address: "2 Marina Boulevard, Singapore 018982",
        dateAdded: "2025-05-10"
    }
];
