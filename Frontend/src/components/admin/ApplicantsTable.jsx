


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { updateApplicantStatus } from '../../redux/applicationSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MoreHorizontal } from 'lucide-react';

const statusOptions = ['Applied', 'Reviewed', 'Accepted', 'Rejected', 'Withdrawn'];
const badgeColors = {
  Applied: 'text-blue-700 bg-blue-100',
  Reviewed: 'text-yellow-700 bg-yellow-100',
  Accepted: 'text-green-700 bg-green-100',
  Rejected: 'text-red-700 bg-red-100',
  Withdrawn: 'text-gray-700 bg-gray-200',
};

const ITEMS_PER_PAGE = 5;

const ApplicantsTable = () => {
  const { applicants } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(applicants.length / ITEMS_PER_PAGE);
  const paginatedApplicants = applicants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleDropdown = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res.data.message || 'Status updated successfully');
        dispatch(updateApplicantStatus({ id, status }));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applicants</h2>

      {paginatedApplicants.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedApplicants.map((applicant) => (
            <div key={applicant._id} className="relative bg-gray-50 rounded-xl shadow-md p-5 border border-gray-100">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{applicant?.applicant?.userName || 'N/A'}</h3>
                  <p className="text-sm text-gray-600">{applicant?.applicant?.email || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{applicant?.applicant?.phoneNumber || 'N/A'}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium text-gray-700">Resume:</span>{' '}
                    {applicant?.applicant?.profile?.resume ? (
                      <a
                        href={applicant.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {applicant.applicant.profile.resumeOriginalName || 'View Resume'}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {applicant?.createdAt ? new Date(applicant?.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                  <span
                    className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${badgeColors[applicant.status] || 'bg-gray-200 text-gray-800'}`}
                  >
                    {applicant.status || 'N/A'}
                  </span>
                </div>

                <div className="relative">
                  <button onClick={() => toggleDropdown(applicant._id)} className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {activeDropdown === applicant._id && (
                    <div className="absolute z-50 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            statusHandler(status, applicant._id);
                            setActiveDropdown(null);
                          }}
                          disabled={status === applicant.status}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            status === applicant.status
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No applicants found</h3>
          <p className="mt-1 text-gray-500">Try posting a job to attract applicants.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;
