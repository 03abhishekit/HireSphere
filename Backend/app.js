

import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/dbConnect.js';
import { router as userRoutes } from './routes/userRoutes.js';
import { router as companyRoutes } from './routes/companyRoutes.js';
import {router as jobRoutes} from "./routes/jobRoutes.js";
import { router as applicationRoutes } from './routes/applicationRoutes.js';


dotenv.config({});

//  Call Database connection
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;


//  middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 
app.use(cors({
  origin:  ['http://localhost:5173'],
  credentials: true,
  
}));




app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Backend is Running!");
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
