import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchJobByText?.toLowerCase() || "";
    const updatedJobs = allAdminJobs.filter((job) => {
      if (!search) return true;
      return (
        job?.jobTitle?.toLowerCase().includes(search) ||
        job?.company?.companyName?.toLowerCase().includes(search)
      );
    });
    setFilteredJobs(updatedJobs);
    setCurrentPage(1); // Reset page when search changes
  }, [allAdminJobs, searchJobByText]);

  const togglePopover = (id, e) => {
    e.stopPropagation();
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-200 p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={job?.company?.companyLogo}
                  alt="logo"
                  className="h-12 w-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{job?.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{job?.company?.companyName}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => togglePopover(job._id, e)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {openPopoverId === job._id && (
                  <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/recruiter/companies/${job?.company?._id}`);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                      Edit
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/recruiter/jobs/${job?._id}/applicants`);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-green-600" />
                      Applicants
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Posted on:{" "}
              {new Date(job?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded-md bg-gray-200 text-sm hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded-md bg-gray-200 text-sm hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search filter.</p>
        </div>
      )}
    </div>
  );
};

export default AdminJobsTable;
