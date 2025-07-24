import React, { useState } from "react";
import { Search, MapPin, Bed, Bath, Car, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-home.jpg";

const API_URL = "/api/listing";

const HeroSection = () => {
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState("");

  const isValidSearch = address || type || budget;

  const handleSearch = async () => {
    setError("");
    if (!isValidSearch) {
      setFilteredListings([]);
      setError("Please enter at least one filter option.");
      return;
    }

    const params = new URLSearchParams();
    if (address) params.append("address", address);
    if (type) params.append("type", type);

    if (budget === "0-10") {
      params.append("minPrice", 0);
      params.append("maxPrice", 1000000);
    } else if (budget === "10-25") {
      params.append("minPrice", 1000000);
      params.append("maxPrice", 2500000);
    } else if (budget === "25-50") {
      params.append("minPrice", 2500001);
      params.append("maxPrice", 5000000);
    } else if (budget === "50-1cr") {
      params.append("minPrice", 5000001);
      params.append("maxPrice", 10000000);
    } else if (budget === "1cr+") {
      params.append("minPrice", 10000001);
    }

    try {
      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data = await res.json();
      setFilteredListings(data);
      if (data.length === 0) setError("No properties found for this search.");
    } catch (err) {
      setFilteredListings([]);
      setError("Failed to fetch listings.");
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find Your
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {" "}
              Dream Home
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover the perfect property from our extensive collection of
            homes, apartments, and commercial spaces.
          </p>

          {/* Search Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-elegant p-6 md:p-8 max-w-4xl mx-auto animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter location"
                  className="pl-10 h-12 border-0 bg-muted/50 focus:bg-background transition-colors"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sell</SelectItem>
                </SelectContent>
              </Select>

              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:bg-background">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10">₹0 - ₹10L</SelectItem>
                  <SelectItem value="10-25">₹10L - ₹25L</SelectItem>
                  <SelectItem value="25-50">₹25L - ₹50L</SelectItem>
                  <SelectItem value="50-1cr">₹50L - ₹1Cr</SelectItem>
                  <SelectItem value="1cr+">₹1Cr+</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="hero"
                size="lg"
                className="h-12"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Popular:
              </span>
              {[
                { label: "Rent", value: "rent" },
                { label: "Sell", value: "sale" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setType(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </div>

          {/* Listings Results - Card Format */}
          {filteredListings.length > 0 && (
            <div className="mt-12 w-full max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-left mb-6">
                Search Results ({filteredListings.length} properties found)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <Card key={listing._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative h-48 bg-muted">
                        {listing.imageUrls && listing.imageUrls.length > 0 ? (
                          <img
                            src={listing.imageUrls[0]}
                            alt={listing.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Home className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <Badge 
                          className={`absolute top-3 right-3 ${
                            listing.type === "rent" ? "bg-blue-500" : "bg-green-500"
                          }`}
                        >
                          {listing.type === "rent" ? "For Rent" : "For Sale"}
                        </Badge>
                        {listing.offer && (
                          <Badge className="absolute top-3 left-3 bg-red-500">
                            Special Offer
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                        {listing.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.address}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {listing.bedrooms} bed
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {listing.bathrooms} bath
                        </div>
                        {listing.parking && (
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-1" />
                            Parking
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {listing.description}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ₹{listing.regularPrice?.toLocaleString()}
                        </div>
                        {listing.offer && listing.discountPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ₹{listing.discountPrice?.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Properties" },
              { number: "5K+", label: "Happy Clients" },
              { number: "50+", label: "Cities" },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;