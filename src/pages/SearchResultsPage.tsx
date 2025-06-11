import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertySearchForm from "@/components/properties/PropertySearchForm";
import * as propertyService from "@/services/propertyService";
import { PropertyQueryFilters, PropertySummary } from "@/types/api";
import { List, MapPin as MapPinIcon, SearchX } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const [currentFilters, setCurrentFilters] = useState<PropertyQueryFilters>(
    () => {
      const params: PropertyQueryFilters = {};
      searchParams.forEach((value, key) => {
        if (
          key === "minPrice" ||
          key === "maxPrice" ||
          key === "bedrooms" ||
          key === "bathrooms" ||
          key === "sizeMin" ||
          key === "sizeMax"
        ) {
          params[key] = Number(value);
        } else if (key === "amenities") {
          params[key] = value.split(",");
        } else {
          (params as any)[key] = value;
        }
      });
      return params;
    }
  );

  const fetchProperties = useCallback(
    async (filters: PropertyQueryFilters, page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const query = { ...filters, page, size: ITEMS_PER_PAGE };
        const response = await propertyService.getProperties(query);
        setProperties(response.content);
        setTotalResults(response.content.length);
      } catch (err: any) {
        setError(err.message || "Failed to fetch properties.");
        setProperties([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProperties(currentFilters, currentPage);
  }, [fetchProperties, currentFilters, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters: Partial<PropertyQueryFilters>) => {
    const updatedFilters = { ...currentFilters, ...newFilters, page: 0 };
    setCurrentFilters(updatedFilters);
    setCurrentPage(0);

    // Update URL search params
    const newSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(updatedFilters)) {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          newSearchParams.set(key, value.join(","));
        } else {
          newSearchParams.set(key, String(value));
        }
      }
    }
    setSearchParams(newSearchParams);
  };

  // Initial filters from URL for the top search form
  const initialSearchFormValues = {
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    listingType: (searchParams.get("status") as "buy" | "rent") || "buy",
  };

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const getSearchQueryDisplay = () => {
    let parts = [];
    if (currentFilters.location)
      parts.push(`Location: "${currentFilters.location}"`);
    if (currentFilters.propertyType)
      parts.push(`Type: "${currentFilters.propertyType}"`);
    if (currentFilters.listingType)
      parts.push(`For: "${currentFilters.listingType}"`);
    return parts.length > 0
      ? `Showing results for ${parts.join(", ")}`
      : "Showing all properties";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <PropertySearchForm
          initialValues={initialSearchFormValues}
          variant="page_top"
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <PropertyFilters
            filters={currentFilters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <section className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Search Results ({totalResults})
              </h2>
              <p className="text-sm text-gray-600">{getSearchQueryDisplay()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                id="sort-by"
                name="sortBy"
                value={currentFilters.sortBy || "relevance"}
                onChange={(e) =>
                  handleFilterChange({
                    sortBy: e.target.value as PropertyQueryFilters["sortBy"],
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white text-sm min-w-[180px]"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date_desc">Newest</option>
              </select>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 border rounded-md transition-colors ${
                  viewMode === "list"
                    ? "text-primary bg-primary-light border-primary"
                    : "text-gray-500 hover:text-primary hover:bg-gray-100 border-gray-300"
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 border rounded-md transition-colors ${
                  viewMode === "map"
                    ? "text-primary bg-primary-light border-primary"
                    : "text-gray-500 hover:text-primary hover:bg-gray-100 border-gray-300"
                }`}
                title="Map View"
              >
                <MapPinIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isLoading && <LoadingSpinner />}
          {error && (
            <ErrorMessage title="Error Fetching Properties" message={error} />
          )}

          {!isLoading && !error && (
            <>
              {viewMode === "list" &&
                (properties.length > 0 ? (
                  <div className="space-y-6">
                    {properties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isDetailedView={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <SearchX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">
                      No Properties Found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search criteria or filters.
                    </p>
                  </div>
                ))}

              {viewMode === "map" && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <img
                    src="/assets/images/map_placeholder.svg"
                    alt="Map View Placeholder"
                    className="w-full h-96 object-cover rounded-md"
                  />
                  <p className="text-center text-gray-600 mt-4">
                    Interactive map view coming soon. Property locations will be
                    pinned on the map.
                  </p>
                </div>
              )}

              {totalPages > 1 &&
                viewMode === "list" &&
                properties.length > 0 && (
                  <div className="mt-8 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <Button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          variant={
                            pageNumber === currentPage ? "primary" : "outline"
                          }
                          size="sm"
                          className={
                            pageNumber === currentPage
                              ? ""
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }
                        >
                          {pageNumber}
                        </Button>
                      )
                    )}
                  </div>
                )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchResultsPage;
