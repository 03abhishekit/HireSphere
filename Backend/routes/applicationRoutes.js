


import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateApplication, withdrawApplication } from "../controllers/applicationControllers.js";
import isAuthenticated from "../middleWare/isAuthenticated.js";


const router = express.Router();



router.get("/apply/:id", isAuthenticated, applyJob);

router.get("/get", isAuthenticated, getAppliedJobs);

router.get("/:id/applicants", isAuthenticated, getApplicants);

router.post("/status/:id/update", isAuthenticated, updateApplication);

router.delete("/status/:id/delete", isAuthenticated, withdrawApplication );


export { router };
