import express from "express";
import { getRecommendedCategories, getRecommendedJobs } from "../controllers/recommended.js";

const router = express.Router()

// Update them to include the :userId parameter:
router.get("/cat/:userId", getRecommendedCategories);
router.get("/job/:userId", getRecommendedJobs);
export default router;