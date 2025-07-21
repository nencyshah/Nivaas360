import express from "express";
import { createBuying, getAllBuyings } from "../controllers/buying.controller.js";

const router = express.Router();

router.post("/create", createBuying);
router.get("/", getAllBuyings);

export default router;
