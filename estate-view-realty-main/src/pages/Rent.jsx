import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";

const Rent = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  // Fetch properties for rent
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // Fetch all rent listings and user's rental offers
    Promise.all([
      fetch("/api/listing?type=rent").then((res) => res.json()),
      fetch(`/api/rental?renterId=${user._id}`).then((res) => res.json()),
    ])
      .then(([allProperties, rentals]) => {
        // Get all listingIds the user has made an offer on
        const offeredListingIds = new Set(
          rentals.map((r) => r.listingId && r.listingId._id)
        );
        // Filter out properties the user has already made an offer on
        const filtered = allProperties.filter(
          (p) => !offeredListingIds.has(p._id)
        );
        setProperties(filtered);
        setUserRentals(rentals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Handle Rent Request
  const handleRent = async (listingId) => {
    const renterId = user ? user._id : "";
    const offerPrice = 500; // TODO: Make this dynamic with input
    const transactionType = "rent";
    const duration = "12"; // TODO: Make this dynamic with input (in months)

    try {
      const res = await fetch("/api/rental/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId,
          renterId,
          offerPrice,
          transactionType,
          duration,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Rental request created successfully!");
        // Remove the property from the list after making an offer
        setProperties((prev) => prev.filter((p) => p._id !== listingId));
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating rental request:", error);
      alert("Something went wrong!");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to view available properties for rent.
        </p>
      </div>
    );
  }

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
                  Featured Properties for Rent
                </h2>
                <p className="text-muted-foreground">
                  Discover our handpicked selection of premium rental properties
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
                <FilterSidebar isOpen={true} onClose={() => {}} />
              </div>

              {/* Mobile Sidebar */}
              <div className="lg:hidden">
                <FilterSidebar
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
              </div>

              {/* Properties Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {loading ? (
                    <div className="col-span-full text-center text-muted-foreground">
                      Loading properties...
                    </div>
                  ) : properties.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground">
                      No properties found. Check back later!
                    </div>
                  ) : (
                    properties.map((property) => (
                      <div
                        key={property._id}
                        className="border rounded-lg p-4 shadow-md"
                      >
                        <PropertyCard property={property} />
                        <Button
                          onClick={() => handleRent(property._id)}
                          className="mt-4 w-full"
                        >
                          Make an Offer
                        </Button>
                      </div>
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

export default Rent;
