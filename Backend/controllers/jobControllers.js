
import Job from "../models/jobModels.js";



export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Only recruiters can create jobs"
      });
    }

    const userId = req?.user._id;
  

    // Handle array of jobs
    if (Array.isArray(req.body)) {
      const jobsData = req.body.map(job => {
        const {
          jobTitle, description, requirements, salary,
          salaryType, experienceLevel, jobLocation,
          employmentType, position, company
        } = job;

        if (!jobTitle || !description || !requirements || !salary ||
            !salaryType || !jobLocation || !experienceLevel || !position ||
            !employmentType || !company) {
          throw new Error("All fields are required.");
        }

        const formattedRequirements = Array.isArray(requirements)
          ? requirements.map(r => r.trim())
          : requirements.split(",").map(r => r.trim());

        return {
          jobTitle,
          description,
          requirements: formattedRequirements,
          salary: Number(salary),
          salaryType,
          jobLocation,
          experienceLevel,
          employmentType,
          position: Number(position),
          company,
          createdBy: userId,
        };
      });

      const createdJobs = await Job.insertMany(jobsData);

      return res.status(201).json({
        success: true,
        jobs: createdJobs,
        message: "Jobs created successfully"
      });
    }

    // Handle single job
    const {
      jobTitle, description, requirements, salary,
      salaryType, experienceLevel, jobLocation,
      employmentType, position, company
    } = req.body;

   

    if (!jobTitle || !description || !requirements || !salary ||
        !salaryType || !jobLocation || !experienceLevel || !position ||
        !employmentType || !company) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      });
    }

    const formattedRequirements = Array.isArray(requirements)
      ? requirements.map(r => r.trim())
      : requirements.split(",").map(r => r.trim());

    const job = await Job.create({
      jobTitle,
      description,
      requirements: formattedRequirements,
      salary: Number(salary),
      salaryType,
      jobLocation,
      experienceLevel,
      employmentType,
      position: Number(position),
      company,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      job,
      message: "Job created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error creating job"
    });
  }
};





export const getAllJobs = async (req, res) => {
  try {
    const keyword = req?.query?.keyword || "";
    console.log("ey",keyword);
    const query = {
      $or: [
        { jobTitle: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { 'company.companyName': { $regex: keyword, $options: "i" } }
      ]
    };

   
    
    const jobs = await Job.find(query).populate({
      path: "company",
      select: "companyName companyLogo"
    }).sort({ createdAt: -1 });

   
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate("company", "companyName companyLogo companyWebsite")
      .populate("applications");
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }
    
    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (!req.user || req?.user?.role !== "recruiter") {
      return res.status(403).json({ success: false, message: "Unauthorized: Only recruiters can update jobs" });
    }

   
    
  

  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate('company');
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found" 
      });
    }


    if (job?.createdBy.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You don't own this company"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, 
        req.body,
      
      { new: true, runValidators: true }).populate('company', 'companyName companyLogo');;

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job: updatedJob,message: "Job updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (!req?.user || req.user.role !== "recruiter") {
      return res.status(403).json({ success: false, message: "Unauthorized: Only recruiters can delete jobs" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete jobs you created",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAdminJobs = async (req, res) => {
  try {

    if (req.user?.role !== "recruiter") {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized access" 
      });
    }
    const adminId = req?.user._id;
    const jobs = await Job.find({ createdBy: adminId }).populate("company", "companyName companyLogo").sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false
      });
    }

    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
