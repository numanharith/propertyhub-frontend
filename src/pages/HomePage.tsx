import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertySummary } from '@/types/api';
import * as propertyService from '@/services/propertyService';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertySearchForm from '@/components/properties/PropertySearchForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { SearchCheck, Users, ThumbsUp, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<PropertySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        const response = await propertyService.getProperties({ size: 3 }); // Fetch first 3 as "featured"
        setFeaturedProperties(response.content);
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
      <section className="hero-section bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Property</h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">Search through thousands of listings for sale and rent in your desired location.</p>
          <PropertySearchForm variant="hero" />
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Properties</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured properties available at the moment.</p>
          )}
          <div className="text-center mt-12">
            <Link to="/search_results" className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors inline-flex items-center">
              View All Properties <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose PropertyHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light p-3 rounded-full">
                  <SearchCheck className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Extensive Listings</h3>
              <p className="text-gray-600">Access a wide variety of properties to find exactly what you're looking for.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light p-3 rounded-full">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Agents</h3>
              <p className="text-gray-600">Connect with professional and verified real estate agents.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light p-3 rounded-full">
                  <ThumbsUp className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly Experience</h3>
              <p className="text-gray-600">Enjoy a seamless and intuitive platform designed for your ease.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
