



import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
   
    jobTitle: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
        required: true 
    },
    requirements:[{
        type:String,
    }],
    salary: { 
        type: Number, 
        required: true 
    },
    salaryType: { 
        type: String, 
        enum: ["Yearly", "Monthly", "Hourly"],
         required: true
     },
     experienceLevel: {
         type: String ,
         required: true
         
    },
    jobLocation: {
         type: String, 
         required: true
     },
   
    employmentType: { 
        type: String,
        enum: ["Full-time", "Part-time", "Internship", "Temporary"],
          required: true 
    },
    position: {
        type: Number,
        required: true
    },
    postingDate: {
           type: Date, 
           default: Date.now 
      },
    company:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Company", 
        required: true 
    },

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    applications:[
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
  },
  {
     timestamps: true
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;