


import { ArrowRight, Pencil,   Clock, MapPin, Sprout } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import JobDeleteButton from './admin/job/JobDeleteButton';
import { toast } from 'react-toastify';

const Card = ({job}) => {

   

    const navigate = useNavigate();
    const {user} = useSelector((store)=> store.auth);
    const userRole = user?.role || "";

 
  const canApply = userRole === "student";
  const canEditOrUpdate = userRole === "recruiter";


  const {
    _id,
    jobTitle,
    description,
    jobLocation,
    employmentType,
    experienceLevel,
  } = job;

  const companyLogo = job?.company?.companyLogo;
  const companyName = job?.company?.companyName;
  
  const handleNavigate = () => navigate(`/description/${_id}`);

  const handleApply = (e) => {
    e.stopPropagation();
    toast.info("Application process will start shortly...");
    navigate("/jobs")
  };
    
  return (
   
      
  <div className="bg-[#e0f2fe] text-blue-800 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
  {/* Header with company info */}
  <div className="p-5 pb-0">
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 overflow-hidden  bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={` Logo`}
            className="object-contain w-10 h-10"
          />
        ) : (
          <div className="text-gray-400 text-xs font-medium">No Logo</div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{jobTitle}</h3>
        <div className="flex items-center gap-2 mt-1">
          
          <span className="text-sm text-gray-500">{companyName}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Job details */}
  <div className="p-5 pt-3">
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
        <MapPin className="w-2 h-4 text-blue-600" />
        <span className="text-sm text-gray-700">{jobLocation}</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
        <Clock className="w-2 h-4 text-purple-600" />
        <span className="text-sm text-gray-700">{employmentType}</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
        <Sprout className="w-2 h-4 text-purple-600" />
        <span className="text-sm text-gray-700">{experienceLevel}</span>
      </div>
    </div>

    {/* Description */}
    <p className="text-gray-600 text-sm line-clamp-3 mb-5 leading-relaxed">
      {description}
    </p>

    {/* Footer with actions */}
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
      {user && (
        <button
          onClick={handleNavigate}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium group"
        >
          <span>View details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      )}

      <div className="flex flex-wrap gap-3">
        {canApply ? (
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            Apply Now
          </button>
        ) : (
          !user && (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  rounded-lg text-sm font-medium transition-colors"
            >
              Login to Apply
            </Link>
          )
        )}

        {canEditOrUpdate && (
          <div className="flex items-center gap-2">
            <Link
              to={`/recruiter/jobs/update/${_id}`}
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
            <JobDeleteButton
                  jobId={_id}
                  createdBy={job?.createdBy} 
                  currentUserId={user?._id}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                  iconClass="w-5 h-5"
                />
          </div>
        )}
      </div>
    </div>
  </div>
</div>
   
  )
}

export default Card
