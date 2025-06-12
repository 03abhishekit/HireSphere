import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Job from './Job';
import FilterCard from './FilterCard';
import NavBar from './shared/NavBar';
import { selectFilteredJobs } from '../redux/jobSlice';
import Footer from './shared/Footer';

const Jobs = () => {
  const { searchJobByText, isLoading, filters } = useSelector(state => state.job);
  const jobsToDisplay = useSelector(selectFilteredJobs);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchJobByText]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsToDisplay.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobsToDisplay.length / jobsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-72 w-full mt-20">
            <FilterCard />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Available Jobs</h1>
              <p className="text-gray-500 text-sm mt-1">
                Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobsToDisplay.length)} of {jobsToDisplay.length} {jobsToDisplay.length === 1 ? 'job' : 'jobs'}
              </p>
            </div>

            {currentJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentJobs.map(job => (
                    <Job key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center mt-8">
                <h3 className="text-lg font-semibold text-gray-700">No jobs found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Jobs;
