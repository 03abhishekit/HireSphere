import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { removeAppliedJob } from '../redux/applicationSlice';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs ';

const AppliedJobTable = () => {
  useGetAppliedJobs();
  const dispatch = useDispatch();
  const { allAppliedJobs, loading, error } = useSelector(store => store.application);
  const [confirmWithdraw, setConfirmWithdraw] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async (applicationId) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${APPLICATION_API_END_POINT}/status/${applicationId}/delete`, {
        withCredentials: true
      });

      if (res?.data?.success) {
        toast.success('Application withdrawn successfully');
        dispatch(removeAppliedJob(applicationId));
        setConfirmWithdraw(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  const statusBadge = (status) => {
    const statusConfig = {
      Applied: 'bg-blue-100 text-blue-700',
      Accepted: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
      Withdrawn: 'bg-gray-100 text-gray-700',
      Reviewed: 'bg-yellow-100 text-yellow-700'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-red-500 text-center text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center sm:text-left">Applied Jobs</h1>

        {allAppliedJobs?.length > 0 ? (
          <div className="space-y-6">
            {allAppliedJobs.map((application) => (
              <div
                key={application?._id}
                className="bg-gray-50 rounded-2xl shadow-md p-5 border border-gray-200 hover:border-purple-400 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <Link to={`/recruiter/jobs/update/${application?.job?._id}`}>
                    <h2 className="text-lg sm:text-xl font-bold text-purple-900 hover:underline">
                      {application.job.jobTitle}
                    </h2>
                  </Link>
                  {statusBadge(application?.status)}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 gap-3">
                  <img
                    src={application?.job?.company?.companyLogo}
                    alt="Company Logo"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{application?.job?.company?.companyName}</p>
                    {application?.job?.company?.companyWebsite && (
                      <a
                        href={application.job.company.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                    <MapPin className="w-4 h-4 mr-1" /> {application?.job?.jobLocation}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                    {application?.job?.salary} LPA
                  </span>
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                    {application?.job?.employmentType}
                  </span>
                </div>

                <div className="mt-3 text-gray-500 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Applied on: {new Date(application.createdAt).toLocaleDateString()}
                </div>

                {application.status === 'Applied' && (
                  <div className="mt-4">
                    {confirmWithdraw === application._id ? (
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() => handleWithdraw(application._id)}
                          disabled={isLoading}
                          className="px-4 py-1.5 text-xs text-white bg-red-600 hover:bg-red-700 rounded-full transition"
                        >
                          {isLoading ? 'Processing...' : 'Yes, Withdraw'}
                        </button>
                        <button
                          onClick={() => setConfirmWithdraw(null)}
                          className="px-4 py-1.5 text-xs border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmWithdraw(application._id)}
                        className="inline-flex items-center px-4 py-1.5 text-white bg-red-500 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm text-xs font-semibold"
                      >
                        Withdraw Application
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
            <Link to="/jobs" className="text-purple-600 hover:underline mt-2 inline-block">
              Browse available jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobTable;
