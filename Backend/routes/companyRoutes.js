



import express from "express";
import isAuthenticated from "../middleWare/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyControllers.js";
import { singleUpload } from "../middleWare/multer.js";




const router = express.Router();


router.post("/register", isAuthenticated, registerCompany);

router.put("/update/:id", isAuthenticated, singleUpload , updateCompany);


router.get("/get", isAuthenticated, getCompany);

router.get("/get/:id", isAuthenticated, getCompanyById);

export { router };