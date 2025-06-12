import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';
import Card from './Card';

const LatestJobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchJobByText } = useSelector((state) => state.job);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredJobs = (allJobs || []).filter((job) =>
    !searchJobByText
      ? true
      : job.jobTitle.toLowerCase().includes(searchJobByText.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const clearFilters = () => {
    dispatch(setSearchJobByText(''));
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-white via-emerald-100 to-emerald-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-emerald-900">
            {searchJobByText ? (
              <>
                Latest "{searchJobByText}" Jobs
                <p className="text-sm font-normal text-gray-600 mt-1">
                  Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
                </p>
              </>
            ) : (
              'Latest Job Openings'
            )}
          </h2>
        </div>
        {searchJobByText && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {currentJobs.length === 0 ? (
        <p className="text-gray-600 text-center py-8 text-base sm:text-lg">
          {searchJobByText
            ? `No "${searchJobByText}" jobs found. Try another search.`
            : 'No jobs available at the moment. Please check back later.'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <Card key={job._id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-md disabled:opacity-50 hover:bg-emerald-200 transition"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-md disabled:opacity-50 hover:bg-emerald-200 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestJobs;
