import express from "express";
import { getActivity, postActivity } from "../controllers/activity.js";

const router = express.Router()

router.get("/", getActivity )
router.post("/", postActivity )

export default router;