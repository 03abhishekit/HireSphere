import express from "express";
import { createJob, deleteJob, getAdminJobs, getAllJobs, getJobById,  updateJob } from "../controllers/jobControllers.js";
import isAuthenticated from "../middleWare/isAuthenticated.js";

const router = express.Router();


router.post("/create", isAuthenticated, createJob);

router.put("/put/:id", isAuthenticated, updateJob);

router.delete("/delete/:id", isAuthenticated, deleteJob);

    
router.get("/get", isAuthenticated, getAllJobs);


router.get("/get/:id", isAuthenticated, getJobById);

router.get("/getadminjobs", isAuthenticated, getAdminJobs);

export { router };