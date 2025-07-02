import express from 'express';
import {signup} from "../controllers/auth.controller.js";
// --- a/file:///d%3A/RealEstate/api/models/auth.routes.js

const router= express.Router();

router.post('/signup',signup);

export default router;