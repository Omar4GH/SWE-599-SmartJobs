import express from "express";
import { updateUser, getUser, getUsers, updateUserSavedJobs,removeUserSavedJob, updateSubscribed, removeSubscribed, updateUserMailing, updateAlert, updateUserAppliedJob, updateUserWantToApplyJob, removeUserWantToApplyJob, removeUserAppliedJob } from "../controllers/users.js";

const router = express.Router();

    router.get("/",getUsers);
    router.get("/:id",getUser);
    router.put("/:id",updateUser);
    router.put("/:id/mailing",updateUserMailing);
    router.post("/:id/saved-jobs", updateUserSavedJobs);
    router.post("/:id/saved-jobs/remove", removeUserSavedJob);
    router.post("/:id/subscribe-search", updateSubscribed);
    router.delete("/:id/subscribe-search/remove", removeSubscribed);
    router.put("/:id/subscribe-search/updatealert", updateAlert);
    router.post("/:id/applied", updateUserAppliedJob);
    router.delete("/:id/applied/remove", removeUserAppliedJob);
    router.post("/:id/wanttoapply", updateUserWantToApplyJob);
    router.delete("/:id/wanttoapply/remove", removeUserWantToApplyJob);
export default router;