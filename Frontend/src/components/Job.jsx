import React, { useState } from 'react';
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, Pencil, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDaysAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`;
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(prev => !prev);
  };


 

  return (
    <div className="bg-teal-100 rounded-2xl hover:bg-teal-200 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
      <div className="p-4 sm:p-6">
        {/* Top Row: Time & Bookmark */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
            <Clock size={14} />
            {getDaysAgo(job?.createdAt)}
          </span>
          <button
            onClick={handleBookmarkClick}
            className={`transition-colors ${isBookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Company Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={job.company?.companyLogo || '/default-company.png'}
            alt={job.company?.companyName}
            className="w-14 h-14 object-contain rounded-xl border border-gray-200"
          />
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{job.jobTitle}</h2>
            <h3 className="text-sm sm:text-md font-medium text-gray-700">{job.company?.companyName}</h3>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <MapPin className="w-2 h-2 text-blue-600" />
                <span className="text-sm text-gray-700">{job.jobLocation}</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <p className="text-gray-600 mt-4 line-clamp-2 text-sm sm:text-[15px]">{job.description}</p>

        {/* Details Row */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
           <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                   <span className="text-sm text-gray-700">{job.employmentType}</span>
                 </div>
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
            <span className="text-sm text-gray-700">{job.experienceLevel}</span>
          </div>
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
              <span className="text-sm text-violet-700">₹{job.salary} LPA</span>
            </div>
        </div>

        {/* Button */}
        <div  className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">

        
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium group"
        >

         <span> View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

           <Link
              to={`/recruiter/jobs/update/${job?._id}`}
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Job;
