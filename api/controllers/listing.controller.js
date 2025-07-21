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
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
};