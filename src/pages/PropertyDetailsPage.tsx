import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropertyDetailMock as PropertyDetail } from '@/types/api'; // Using extended mock type
import * as propertyService from '@/services/propertyService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import PropertyCard from '@/components/properties/PropertyCard';
import { formatPrice } from '@/utils/formatters';
import { MapPin, BedDouble, Bath, MoveHorizontal, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import Button from '@/components/common/Button';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [similarProperties, setSimilarProperties] = useState<PropertyDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        setError("Property ID not provided.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProperty = await propertyService.getPropertyById(id) as unknown as PropertyDetail; // Cast for mock data
        setProperty(fetchedProperty);
        document.title = `${fetchedProperty.title} - PropertyHub`;

        const allPropsResponse = await propertyService.getProperties({size: 4}); // Fetch a few
        const similar = allPropsResponse.content.filter(p => p.id !== id).slice(0,3) as unknown as PropertyDetail[];
        setSimilarProperties(similar);
      } catch (err: any) {
        setError(err.message || "Failed to fetch property details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  if (isLoading) return <LoadingSpinner text="Loading property details..." className="py-20"/>;
  if (error) return <ErrorMessage title="Error" message={error} className="container mx-auto my-8" />;
  if (!property) return <div className="container mx-auto my-8 text-center">Property not found.</div>;

  const images = property.imageUrls || property.images || ['/assets/images/property_placeholder_1.svg']; // Fallback for mock data

  const handleNextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  const handleThumbnailClick = (index: number) => setCurrentImageIndex(index);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setContactFormSuccess(true);
    setShowContactForm(false);
    setTimeout(() => setContactFormSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Gallery */}
        <section className="mb-8 relative">
          <img src={images[currentImageIndex]} alt={property.title} className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md gallery-image" />
          {images.length > 1 && (
            <>
              <Button onClick={handlePrevImage} variant="outline" className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/75 !border-transparent p-2 !rounded-full">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </Button>
              <Button onClick={handleNextImage} variant="outline" className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/75 !border-transparent p-2 !rounded-full">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </Button>
            </>
          )}
          {images.length > 1 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-14 md:w-24 md:h-16 object-cover rounded-md cursor-pointer border-2 hover:border-primary transition-colors ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Main Info & Agent Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Basic Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{property.title}</h1>
              <p className="text-gray-600 text-lg flex items-center mb-4"><MapPin className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" /> {property.location}</p>
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">{property.listingType || property.status}</span>
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{property.propertyType || property.type}</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-secondary my-4">
              {formatPrice(property.price)} { (property.listingType || property.status) === 'For Rent' && <span className="text-lg font-normal text-gray-500">/month</span>}
            </p>

            {/* Key Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Key Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg"><BedDouble className="w-6 h-6 mr-3 text-primary" /> <div><span className="font-medium">{property.bedrooms}</span> Bedrooms</div></div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg"><Bath className="w-6 h-6 mr-3 text-primary" /> <div><span className="font-medium">{property.bathrooms}</span> Bathrooms</div></div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg"><MoveHorizontal className="w-6 h-6 mr-3 text-primary" /> <div><span className="font-medium">{property.areaSqFt || property.size}</span> sqft</div></div>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(amenity => <span key={amenity} className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm capitalize">{amenity}</span>)}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Description</h2>
              <div className="prose max-w-none text-gray-600">
                {property.description.split('\n').map((pText, i) => <p key={i}>{pText}</p>)}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Location Map</h2>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden"> {/* Changed aspect ratio to video for common map sizes */}
                <img src="/assets/images/map_placeholder.svg" alt="Property Location Map Placeholder" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Approximate location. Exact address provided upon inquiry.</p>
            </div>
          </div>

          {/* Agent/Contact Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Lister</h2>
              {property.lister && (
                <div className="flex items-center mb-4">
                  <img src={"https://i.pravatar.cc/150"} alt={property.lister.fullName} className="w-16 h-16 rounded-full mr-4 object-cover" />
                  <div>
                    <p className="font-semibold text-lg text-primary">{property.lister.fullName}</p>
                  </div>
                </div>
              )}
              {property.lister?.phone && (
                <a href={`tel:${property.lister.phone}`} className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors mb-3 flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2" /> Call Agent
                </a>
              )}
              <Button onClick={() => setShowContactForm(!showContactForm)} variant="secondary" className="w-full flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" /> Email Agent
              </Button>
              
              {contactFormSuccess && <p className="mt-3 text-green-600 text-sm">Your message has been sent!</p>}

              {showContactForm && (
                <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
                  <input type="text" placeholder="Your Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                  <input type="email" placeholder="Your Email" required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                  <textarea placeholder="I'm interested in this property..." rows={3} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"></textarea>
                  <Button type="submit" variant="primary" className="w-full text-sm">Send Message</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
