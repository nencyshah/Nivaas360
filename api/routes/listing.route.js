import express from "express";
import { createListing,getAllListings } from "../controllers/listing.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";



const router = express.Router();


router.post("/create",VerifyToken, createListing);
router.get("/", getAllListings);

export const listingRouter = router;