


import axios from 'axios';
import React, { useState, useEffect } from 'react'
import NavBar from './shared/NavBar';
import Footer from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';
import { setSingleJob } from '../redux/jobSlice';
import { Briefcase, MapPin, Clock, Calendar, DollarSign, Award, Globe } from 'lucide-react';

const JobDescription = () => {
  const {singleJob} = useSelector(store => store.job);

  const {user} = useSelector(store => store.auth);
 

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

  const languages = ['English', 'Hindi'];
  const formattedRequirements = singleJob?.requirements?.join(', ');

  const handleJobApply = async()=>{
    setIsLoading(true);
    try{
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId} `, { withCredentials: true });

   
      if (res?.data?.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob, 
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    }
    catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Application failed');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res?.data?.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Failed to load job details');
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-gray-500">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-500">{label}</h3>
      <p className="text-gray-800">{value}</p>
    </div>
  </div>
);
  return (
     <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-100 min-h-screen flex flex-col">
    <NavBar />
    <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Job Header */}
      <section className="bg-gray-100 shadow-md rounded-xl p-6 sm:p-8 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{singleJob?.jobTitle}</h1>
            <div className="flex items-center mt-2 text-gray-600 gap-2 flex-wrap">
              <img src={singleJob?.company?.companyLogo} alt="" className="w-8 h-8" />
              <span className="text-sm font-medium">{singleJob?.company?.companyName}</span>
              {singleJob?.company?.companyWebsite && (
                <a
                  href={singleJob.company.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline text-sm"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
          
          <button
            onClick={!isApplied ? handleJobApply : null}
            disabled={isApplied || isLoading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors ${
              isApplied
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isLoading ? 'Applying...' : isApplied ? 'Applied Successfully' : 'Apply Now'}
          </button>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            <MapPin className="w-4 h-4 mr-1" /> {singleJob?.jobLocation}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">{singleJob?.salary} LPA</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">{singleJob?.employmentType}</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Description and Requirements */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-100 rounded-xl shadow p-6 border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{singleJob?.description}</p>
          </section>

          <section className="bg-white rounded-xl shadow p-6 border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
            <ul className="space-y-2 text-gray-700">
              {singleJob?.requirements?.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-2 w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                  {req}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right: Job Details */}
        <div className="space-y-6">
          <section className="bg-gray-100 rounded-xl shadow p-6 border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
            <div className="space-y-4 text-sm text-gray-800">
              <DetailItem icon={<DollarSign />} label="Salary" value={`${singleJob?.salary} LPA (${singleJob?.salaryType})`} />
              <DetailItem icon={<Briefcase />} label="Experience" value={singleJob?.experienceLevel} />
              <DetailItem icon={<Clock />} label="Job Type" value={singleJob?.employmentType} />
              <DetailItem icon={<Calendar />} label="Posted" value={singleJob?.postingDate ? formatDate(singleJob?.postingDate) : 'N/A'} />
              <DetailItem icon={<Globe />} label="Languages" value={languages.join(', ')} />
            </div>
          </section>
        </div>
      </div>

      {/* Application Status */}
      <section className="bg-gray-100 rounded-xl shadow p-6 border text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Award className="text-purple-600 w-5 h-5" />
            <div className={`${isApplied ? 'text-green-700' : 'text-blue-700'}`}>
              <p className="font-semibold">
                {isApplied
                  ? '✓ Your application has been submitted'
                  : 'Ready to apply for this position?'}
              </p>
              {!isApplied && (
                <p className="text-xs mt-1 text-gray-600">
                  Complete your profile to increase your chances.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Application Note */}
      <section className="bg-gray-100 rounded-xl shadow p-6 border">
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <Award className="text-purple-600 w-5 h-5 flex-shrink-0" />
          <p>
            Applications will be reviewed within 3–5 business days. Shortlisted candidates will be contacted via email for further steps.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
  )
}

export default JobDescription
