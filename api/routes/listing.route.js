import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { VerifyToken } from "../utils/VerifyToken.js";



const router = express.Router();


router.post("/create",VerifyToken, createListing);

export const listingRouter = router;