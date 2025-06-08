import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Button from "@/components/common/Button";
import { PropertyQueryFilters } from "@/types/api";

interface PropertySearchFormProps {
  initialValues?: {
    location?: string;
    propertyType?: string;
    listingType?: "buy" | "rent";
  };
  variant?: "hero" | "page_top"; // For styling variations
  onFilterChange?: (filters: Partial<PropertyQueryFilters>) => void;
}

const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  initialValues = {},
  variant = "hero",
  onFilterChange,
}) => {
  const [location, setLocation] = useState(initialValues.location || "");
  const [propertyType, setPropertyType] = useState(
    initialValues.propertyType || ""
  );
  const [listingType, setListingType] = useState<"buy" | "rent">(
    initialValues.listingType || "buy"
  );
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (location) queryParams.set("location", location);
    if (propertyType) queryParams.set("property_type", propertyType);
    queryParams.set("status", listingType);

    navigate(`/search_results?${queryParams.toString()}`);
    if (onFilterChange) onFilterChange({ location, propertyType });
  };

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
          <div>
            <label
              htmlFor="search-location-hero"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="search-location-hero"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Orchard, Singapore"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="search-property-type-hero"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="search-property-type-hero"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900 bg-white"
            >
              <option value="">All Types</option>
              <option value="condo">Condo</option>
              <option value="hdb">HDB Flat</option>
              <option value="Landed House">Landed House</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Looking For
            </span>
            <div className="flex space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setListingType("buy")}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors text-sm ${
                  listingType === "buy"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-primary"
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setListingType("rent")}
                className={`flex-1 px-4 py-3 rounded-lg transition-colors text-sm ${
                  listingType === "rent"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-primary"
                }`}
              >
                Rent
              </button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full text-lg"
          size="lg"
        >
          <Search className="w-5 h-5 mr-2 inline-block" />
          Search
        </Button>
      </form>
    );
  }

  // Example 'page_top' variant structure based on search_results.html
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
    >
      <div>
        <label
          htmlFor="search-location-page"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          type="text"
          id="search-location-page"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Orchard"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="search-property-type-page"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Property Type
        </label>
        <select
          id="search-property-type-page"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white text-sm"
        >
          <option value="">All Types</option>
          <option value="condo">Condo</option>
          <option value="hdb">HDB Flat</option>
          <option value="Landed House">Landed House</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="search-bedrooms-page"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bedrooms
        </label>
        <select
          id="search-bedrooms-page"
          name="bedrooms"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white text-sm"
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Looking For
        </span>
        <div className="flex space-x-1 mt-1">
          <button
            type="button"
            onClick={() => setListingType("buy")}
            className={`flex-1 px-3 py-2 rounded-md transition-colors text-sm ${
              listingType === "buy"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-primary"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setListingType("rent")}
            className={`flex-1 px-3 py-2 rounded-md transition-colors text-sm ${
              listingType === "rent"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-primary"
            }`}
          >
            Rent
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="primary"
        className="w-full text-sm py-2.5"
        size="md"
      >
        <Search className="w-4 h-4 mr-2 inline-block" />
        Update Search
      </Button>
    </form>
  );
};

export default PropertySearchForm;
