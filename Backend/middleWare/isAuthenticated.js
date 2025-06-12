import jwt from "jsonwebtoken";
import User from "../models/userModels.js"; 

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        
        
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        
        // Fetch the complete user document
        const user = await User.findById(decode.userId);
        
     
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error.message,
        });
    }
};

export default isAuthenticated;



