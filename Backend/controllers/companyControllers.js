


import Company from "../models/companyModels.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

 const registerCompany = async (req, res) => {
    try {
        
        
        const { companyName, description, companyLocation } = req.body;

        const createdBy = req.user?._id;

        if (!createdBy) {
        return res.status(400).json({ error: 'createdBy is required' });
        }


        
        if (!companyName || !description || !companyLocation ) {
            return res.status(400).json({
                message: "All required fields must be provided.",
                success: false
            });
        }

        let existingCompany = await Company.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register the same company again.",
                success: false
            });
        }

        const newCompany = await Company.create({
            companyName,
            description,
            companyLocation,
            createdBy,
        });

        await newCompany.save();

        return res.status(201).json({
            message: "Company registered successfully.",
            company: newCompany,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};

 const getCompany = async (req, res) => {
    try {
        const userId = req.user?._id; 
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing", success: false });
        }
        const companies = await Company.find({ createdBy: userId });
      
        return res.status(200).json({
            companies,
            success: true,
            message:"Company fetched Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};


 const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};

 const updateCompany = async (req, res) => {
    try {
        const { companyName, description,companyLocation, companyWebsite} = req.body;
        const companyId = req.params.id; 
        const userId = req.user?._id;

      
        if (!companyId || !userId) {
            return res.status(400).json({ message: "Missing parameters.", success: false });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found.", success: false });
        }


        if (company.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this company.", success: false });
        }

        // Handle file upload if present
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            company.companyLogo = cloudResponse.secure_url;
        }

        // Update fields if provided
        if (companyName) {
            company.companyName = companyName;
        }
        if (description) {
            company.description = description;
        }
        if (companyLocation) {
            company.companyLocation = companyLocation;
        }
        if (companyWebsite) {
            company.companyWebsite = companyWebsite;
        }

        // Save the updated company
        await company.save();

        return res.status(200).json({
            message: "Company  Info updated successfully.",
            company: company,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error.", success: false });
    }
};

export {registerCompany, getCompany, getCompanyById, updateCompany};