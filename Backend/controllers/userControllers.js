





import User from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";





const register = async (req, res) => {
            try { 
              
              const {userName, email, phoneNumber, password, role} = req.body; 
            
              if(!userName || !email ||!phoneNumber || !password || !role){
                  return res.status(400).json({
                      message:"All fields are required.",
                      success:false,
                  })
              }
           
              const file = req.file;
              const fileUri = getDataUri(file);
              const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

              const user = await User.findOne({email});
              if(user){
                  return res.status(400).json({
                      success:false,
                      message:"User already exist with this email."
                  })
              }
              const hashedPassword = await bcrypt.hash(password, 10);
              await User.create({
                  userName,
                  email,
                  phoneNumber,
                  password:hashedPassword,
                  role,
                  profile :{
                    profilePhoto:cloudResponse.secure_url,
                  }
                  
              });
              return res.status(201).json({
                  success:true,
                  message:"Account created successfully."
              })
          } catch (error) {
              console.log(error);
              return res.status(500).json({
                  success:false,
                  message:"Failed to register"
              })
            }
};

const login = async (req, res) => {
            try {
              const {email, password, role} = req.body;
              if(!email || !password || !role){
                  return res.status(400).json({
                      success:false,
                      message:"All fields are required."
                  })
              }
              const user = await User.findOne({email});
              if(!user){
                  return res.status(400).json({
                      success:false,
                      message:"Incorrect email or password"
                  })
              }
              const isPasswordMatch = await bcrypt.compare(password, user.password);
              if(!isPasswordMatch){
                  return res.status(400).json({
                      success:false,
                      message:"Incorrect email or password"
                  });
              }

              if(role !== user?.role){
                        return res.status(400).json({
                        success: false,
                        message: "Account doesn't exist with the current role.",
                    });
              }
              generateToken(res, user, `Welcome back ${user.userName}`);

          } catch (error) {
              console.log(error);
              return res.status(500).json({
                  success:false,
                  message:"Failed to login"
              })
          }
  };
  

  const logout = async(req, res)=>{
    try {
      return res.status(200).cookie("token", "", {maxAge:0}).json({
          message:"Logged out successfully.",
          success:true
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"Failed to logout"
      }) 
  }
  }


   const updateProfile = async (req, res) => {
    try {
       
        const { userName, email, phoneNumber, bio, skills } = req.body;
        

         const file = req.file;
         if (!file) {
                return res.status(400).json({
                    message: "No file uploaded",
                    success: false
                });
            }
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req?.user._id; 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(userName){
            user.userName = userName;
        } 
        if(email) {
            user.email = email;
        }
        if(phoneNumber)  {
            user.phoneNumber = phoneNumber;
        }
        if(bio) {
            user.profile.bio = bio;
        }
        if(skills) {
            user.profile.skills = skillsArray;
        }

         // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }
        await user.save();

        user = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
 
export { register, login, logout, updateProfile };
