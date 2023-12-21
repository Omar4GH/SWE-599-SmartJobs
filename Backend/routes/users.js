import express from "express";
import { updateUser, getUser, getUsers, updateUserSavedJobs,removeUserSavedJob, updateSubscribed, removeSubscribed, updateUserMailing, updateAlert } from "../controllers/users.js";

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
export default router;