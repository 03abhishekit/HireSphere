








import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
      companyName: { 
          type: String, 
          required: true,
          unique:true,
       },
       description: { 
          type: String,
          required: true 
      },
      
      companyLogo: { 
          type: String 
      },
      
      companyLocation: {
           type: String, 
           required: true
       },
       companyWebsite: {
        type: String,
       },
      createdBy: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
      },
    
      
}, 
{ 
    timestamps: true
 }
);



const Company = mongoose.model("Company", companySchema);

export  default Company;

