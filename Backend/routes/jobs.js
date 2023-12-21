import express from "express";
import { deleteJob, getJob, getJobs, getUserJobs, postJob, updateJob, getSavedJobs, updateJobActive, updateJobLike, removeJobLike } from "../controllers/jobs.js";

const router = express.Router();

    router.get("/",getJobs);
    router.get("/saved",getSavedJobs)
    router.get("/:id",getJob);
    router.get("/user/:uid",getUserJobs);
    router.post("/",postJob);
    router.delete("/:id",deleteJob);
    router.put("/:id",updateJob);
    router.put("/:id/job-active", updateJobActive);
    router.post("/:id/like-job", updateJobLike);
    router.post("/:id/like-job/remove", removeJobLike);

export default router;