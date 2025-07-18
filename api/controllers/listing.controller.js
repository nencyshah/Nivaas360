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
export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
