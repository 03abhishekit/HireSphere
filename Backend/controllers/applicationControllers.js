import Application from "../models/applicationModels.js";
import Job from "../models/jobModels.js"; 

import mongoose from "mongoose";

export const applyJob = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json(
        { 
            message: "Job ID is required.",
             success: false 
            }
        );
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json(
        { 
            success: false,
             message: "Invalid job ID format" 
            }
        );
    }

    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) {
      return res.status(400).json(
        { 
            success: false,
             message: "Already applied"
             }
        );
    }

    const job = await Job.findById(jobId);
   

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found"
     }
    );
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      status: "Applied"
    });

    job.applications.push(newApplication?._id);
    await job.save();

    res.status(201).json({
      success: true,
      message: "Job applied successfully.",
      application: newApplication,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error applying for job", error: err.message });
  }
};



export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req?.user?._id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options:{sort:{createdAt:-1}},
        populate: {
          path: "company",
          options:{sort:{createdAt:-1}},
          select: "companyName companyLogo companyWebsite"
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    

    const applications = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate({
        path: "applicant",
        select: "userName email phoneNumber profile",
        populate: {
          path: "profile",
          select: "resume resumeOriginalName"
        }
      });

    if (!applications) {
      return res.status(404).json({
        message: "No applicants found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      applicants: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export const withdrawApplication = async (req, res) => {
  try {
   

    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      applicant: req.user._id,
      status: "Applied"
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found or cannot be withdrawn"
      });
    }

    // Remove from job's applications
    await Job.findByIdAndUpdate(application.job, {
      $pull: { applications: application._id }
    });


    res.status(200).json({ success: true, message: "Application withdrawn.", application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const validStatuses = ["Applied", "Withdrawn", "Reviewed", "Rejected", "Accepted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        success: false,
      });
    }

    

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: "Application not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Application status updated successfully", 
      application
     });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



