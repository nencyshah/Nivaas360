import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    // Extract imageUrls from request body
    const { imageUrls, ...otherData } = req.body;

    // Create listing with images stored as base64 strings in MongoDB
    const listing = await Listing.create({
      ...otherData,
      imageUrls: imageUrls || [], // Store base64 image strings directly
    });

    console.log(
      "Images stored in MongoDB:",
      listing.imageUrls.length,
      "images"
    );
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getAllListings = async (req, res) => {
  try {
    const { address, type, minPrice, maxPrice } = req.query;
    const filter = {};

    // Address filter - case-insensitive partial match
    if (address && address.trim()) {
      filter.address = { $regex: address.trim(), $options: "i" };
    }

    // Type filter - exact match
    if (type && type.trim()) {
      filter.type = type.trim();
    }

    // Price filter - range
    if (minPrice || maxPrice) {
      filter.regularPrice = {};
      if (minPrice) filter.regularPrice.$gte = Number(minPrice);
      if (maxPrice) filter.regularPrice.$lte = Number(maxPrice);
    }

    // Debug logs
    console.log("Query params received:", req.query);
    console.log("MongoDB filter being used:", filter);

    const listings = await Listing.find(filter);

    console.log("Listings found:", listings.length);
    console.log(
      "Listings:",
      listings.map((l) => ({ name: l.name, address: l.address, type: l.type }))
    );

    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings", error });
  }
};