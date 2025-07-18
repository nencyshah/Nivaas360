import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Square, Star, Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper to get the correct image src
  const getImageSrc = () => {
    if (property.imageUrls && property.imageUrls.length > 0) {
      const img = property.imageUrls[0];
      return img.startsWith("data:") ? img : `data:image/jpeg;base64,${img}`;
    }
    return "/placeholder.jpg";
  };

  return (
    <div className="group bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getImageSrc()}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Example: Verified badge */}
        {property.verified && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center">
            <Verified className="w-4 h-4 mr-1" /> Verified
          </span>
        )}
        {/* Example: Favorite button */}
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>
      {/* Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">
            {property.name}
          </h3>
          <span className="text-primary font-bold text-xl">
            ₹{property.regularPrice}
            {property.type === "rent" && (
              <span className="text-xs font-normal text-muted-foreground">
                {" "}
                /month
              </span>
            )}
          </span>
        </div>
        <div className="text-muted-foreground text-sm mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {property.address}
        </div>
        <div className="text-sm mb-2">{property.description}</div>
        <div className="flex items-center gap-4 text-sm mb-2">
          <span className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {property.parking && <Badge>Parking</Badge>}
          {property.furnished && <Badge>Furnished</Badge>}
          {property.offer && <Badge>Offer</Badge>}
          {property.type && <Badge>{property.type}</Badge>}
        </div>
        {/* Discount price */}
        {property.discountPrice > 0 && (
          <div className="text-green-600 font-semibold">
            Discount: ₹{property.discountPrice}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
