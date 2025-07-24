import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState(null); // Store filter state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/listing")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtering logic
  const filteredProperties = filters
    ? properties.filter((property) => {
        // Status
        if (filters.status && property.status !== filters.status) return false;
        // Type
        if (filters.type && property.type.toLowerCase() !== filters.type)
          return false;
        // Bedrooms (array)
        if (
          filters.bedrooms &&
          filters.bedrooms.length > 0 &&
          !filters.bedrooms.includes(property.bedrooms)
        )
          return false;
        // Bathrooms
        if (
          filters.bathrooms &&
          property.bathrooms.toString() !== filters.bathrooms
        )
          return false;
        // Price
        if (
          filters.minPrice &&
          property.regularPrice < Number(filters.minPrice)
        )
          return false;
        if (
          filters.maxPrice &&
          property.regularPrice > Number(filters.maxPrice)
        )
          return false;
        // Furnished
        if (
          filters.furnished !== null &&
          property.furnished !== filters.furnished
        )
          return false;
        // Parking
        if (filters.parking !== null && property.parking !== filters.parking)
          return false;
        // Offer
        if (filters.offer !== null && property.offer !== filters.offer)
          return false;
        return true;
      })
    : properties;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {/* Properties Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Featured Properties
                </h2>
                <p className="text-muted-foreground">
                  Discover our handpicked selection of premium properties
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            <div className="flex gap-6">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block">
                <FilterSidebar
                  isOpen={true}
                  onClose={() => {}}
                  onFiltersChange={setFilters}
                />
              </div>
              {/* Mobile/Tablet Sidebar */}
              <div className="lg:hidden">
                <FilterSidebar
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  onFiltersChange={setFilters}
                />
              </div>
              {/* Properties Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center text-muted-foreground">
                      Loading properties...
                    </div>
                  ) : filteredProperties.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground">
                      No properties found. Create a new listing!
                    </div>
                  ) : (
                    filteredProperties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))
                  )}
                </div>
                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Properties
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
