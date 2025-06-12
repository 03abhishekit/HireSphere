

import express from "express";
import { login,  logout,  register, updateProfile } from "../controllers/userControllers.js";
import isAuthenticated from "../middleWare/isAuthenticated.js";
import { singleUpload } from "../middleWare/multer.js";


const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", singleUpload, isAuthenticated, updateProfile);

export  {router};